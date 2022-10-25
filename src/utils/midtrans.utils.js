const { badRequestResponse } = require('./apiResponse.utils');

const requestBRIBCABNI = (channel) => ({
    bank_transfer: {
        bank: channel,
        va_number: '',
    },
});

const requestMandiri = (invoice) => ({
    echannel: {
        bill_info1: `Payment for invoice : ${invoice}.`,
        bill_info2: 'Purchasing online courses.',
    },
});

const requestPermata = (user) => ({
    bank_transfer: {
        bank: 'permata',
        permata: {
            recipient_name: user.name,
        },
    },
});

const requestGopay = () => ({
    gopay: {
        enable_callback: true,
        callback_url: 'https://www.midtrans.com',
    },
});

const requestAlfaIndo = (channel) => ({
    cstore: {
        store: channel,
        message: 'Purchasing online courses.',
    },
});

const payloads = (type, invoice, summary, user, items, requestChannel) => ({
    payment_type: type,
    transaction_details: {
        order_id: invoice,
        gross_amount: summary.sub_total.raw,
    },
    customer_details: {
        first_name: user.name,
        email: user.email,
    },
    item_details: items,
    ...requestChannel,
});

module.exports = {
    paymentRequestPayloads: (channel, invoice, summary, user, items) => {
        switch (channel) {
        case 'bri':
        case 'bca':
        case 'bni':
            return payloads('bank_transfer', invoice, summary, user, items, requestBRIBCABNI(channel));
        case 'mandiri':
            return payloads('echannel', invoice, summary, user, items, requestMandiri(invoice));
        case 'permata':
            return payloads('bank_transfer', invoice, summary, user, items, requestPermata(user));
        case 'gopay':
            return payloads('gopay', invoice, summary, user, items, requestGopay());
        case 'alfamart':
        case 'indomaret':
            return payloads('cstore', invoice, summary, user, items, requestAlfaIndo(channel));
        default:
            throw badRequestResponse('Unsupported payment channel');
        }
    },
};
