const { StatusCodes: status } = require('http-status-codes');
const moment = require('moment');
const crypto = require('crypto');
const {
    apiResponse,
    badRequestResponse,
    notFoundResponse,
} = require('../utils/apiResponse.utils');
const { CoreAPI } = require('../config/midtrans.config');
const { channels } = require('../helpers/midtransChannels.helper');
const {
    User, MidtransResponse, Order, Cart, sequelize,
} = require('../models');
const { CartSummaryTransformer } = require('../helpers/transformers/cart.transformer');
const { SeriesCartTransformer } = require('../helpers/transformers/series.transformer');
const { paymentRequestPayloads } = require('../utils/midtrans.utils');

const updateOrderTable = async (order, response, t) => {
    let channelName = null;
    let virtualNumber = null;
    let actions = null;

    if (response.va_numbers) {
        channelName = response.va_numbers[0].bank;
        virtualNumber = response.va_numbers[0].va_number;
    }
    if (response.bill_key) channelName = 'mandiri';
    if (response.permata_va_number) channelName = 'permata';
    if (response.actions) {
        channelName = 'gopay';
        actions = response.actions;
    }
    if (response.store) channelName = response.store;

    await order.update({
        payment_type: response.payment_type,
        channel_name: channelName,
        virtual_number: virtualNumber,
        permata_va_number: response.permata_va_number ?? null,
        bill_key: response.bill_key ?? null,
        biller_code: response.biller_code ?? null,
        actions,
        payment_code: response.payment_code ?? null,
        status_code: response.status_code,
        transaction_time: response.transaction_time,
    }, { transaction: t });
};

const midtransResponse = async (response, t) => {
    await MidtransResponse.create({
        order_id: response.order_id,
        bank: response.va_numbers ? response.va_numbers[0].bank : null,
        va_number: response.va_numbers ? response.va_numbers[0].va_number : null,
        payment_type: response.payment_type ?? null,
        store: response.store ?? null,
        permata_va_number: response.permata_va_number ?? null,
        status_code: response.status_code ?? null,
        status_message: response.status_message ?? null,
        transaction_id: response.transaction_id ?? null,
        merchant_id: response.merchant_id ?? null,
        gross_amount: response.gross_amount ?? null,
        currency: response.currency ?? null,
        transaction_time: response.transaction_time ?? null,
        transaction_status: response.transaction_status ?? null,
        fraud_status: response.fraud_status ?? null,
        bill_key: response.bill_key ?? null,
        biller_code: response.biller_code ?? null,
        payment_code: response.payment_code ?? null,
        signature_key: response.signature_key ?? null,
        acquirer: response.acquirer ?? null,
        settlement_time: response.settlement_time ?? null,
        approval_code: response.approval_code ?? null,
        actions: response.actions ?? null,
        response_body: response,
    }, { transaction: t });
};

const successPurchaseSeries = async (order, user) => {
    const seriesIds = order.series.map((item) => item.id);
    await user.addSeries(seriesIds);
};

const orderStatusHandling = async (order, user, notification) => {
    if (notification.transaction_status === 'capture') {
        if (notification.fraud_status === 'challenge') {
            await order.update({ status: 'challenge', status_code: notification.status_code });
        } else if (notification.fraud_status === 'accept') {
            await successPurchaseSeries(order, user);
            await order.update({
                status: 'success',
                status_code: notification.status_code,
                paid_at: notification.settlement_time,
            });
        }
    } else if (notification.transaction_status === 'settlement') {
        await successPurchaseSeries(order, user);
        await order.update({
            status: 'success',
            status_code: notification.status_code,
            paid_at: notification.settlement_time,
        });
    } else if (notification.transaction_status === 'deny') {
        await order.update({
            status: notification.transaction_status,
            status_code: notification.status_code,
        });
    } else if (notification.transaction_status === 'cancel' || notification.transaction_status === 'expire') {
        await order.update({ status: 'canceled', status_code: notification.status_code });
    } else if (notification.transaction_status === 'pending') {
        await order.update({ status: 'pending', status_code: notification.status_code });
    }
};

module.exports = {
    invoice: async (req) => {
        try {
            const { identifier } = req.params;
            const { user } = req;

            const invoice = await Order.findOne({ where: { identifier } });
            if (!invoice) return notFoundResponse('Invoice not found');
            if (invoice.user_id !== user.id) throw apiResponse(status.FORBIDDEN, 'FORBIDDEN', 'You are not allowed to access this invoice');

            return apiResponse(status.OK, 'OK', 'Success get invoice', { invoice });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    order: async (req) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.user;
            const channel = req.body.payment_channel.toLowerCase();
            if (!channels(channel)) throw badRequestResponse('Unsupported payment channel');

            const user = await User.findByPk(id);
            if (!user) throw notFoundResponse('User');

            const carts = await user.getCarts({
                include: [{
                    association: 'series',
                }],
            });

            const cartSummary = CartSummaryTransformer(carts);
            const cartSeries = carts.map((cart) => SeriesCartTransformer(cart.series));
            const payloadItemsDetails = cartSeries.map((series) => ({
                id: series.id,
                price: series.is_discount ? series.discount_price.raw : series.price.raw,
                quantity: 1,
                name: series.title,
            }));

            const invoice = `${moment().format('YYMMDD')}${moment().format('HHmmss')}${Math.floor(Math.random() * 1000)}`;
            const identifier = crypto.randomBytes(20).toString('hex');
            // eslint-disable-next-line max-len
            const payload = paymentRequestPayloads(channel, invoice, cartSummary, user, payloadItemsDetails);

            const order = await user.createOrder({
                invoice,
                identifier,
                series: cartSeries,
                gross_amount: cartSummary.sub_total.raw,
            }, { transaction: t });

            const response = await CoreAPI.charge(payload);
            await updateOrderTable(order, response, t);
            await midtransResponse(response, t);
            await Cart.destroy({ where: { user_id: user.id }, transaction: t });
            await t.commit();

            return apiResponse(status.OK, 'OK', 'Success create an order', {
                response,
                redirect: `/api/orders/invoice/${identifier}`,
            });
        } catch (e) {
            await t.rollback();
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    notificationHandler: async (req) => {
        try {
            const notification = await CoreAPI.transaction.notification(req.body);
            console.log(notification);

            const order = await Order.findOne({ where: { invoice: notification.order_id } });
            const user = await User.findByPk(order.user_id);

            await midtransResponse(notification, null);
            await orderStatusHandling(order, user, notification);

            return apiResponse(status.OK, 'OK', 'Success handle notification');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
