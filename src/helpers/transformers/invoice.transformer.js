const moment = require('moment');
const { rupiahFormat } = require('../casts.helper');

const paymentTypeMapper = {
    bank_transfer: 'VA Bank Transfer',
    echannel: 'E-Channel Mandiri',
    gopay: 'GoPay Wallet',
    cstore: 'Convenience Store',
};

module.exports = {
    EmailInvoiceTransformer: (orderAttr, userAttr) => ({
        user: {
            name: userAttr.name,
            username: userAttr.username,
        },
        order: {
            invoice: orderAttr.invoice,
            series: orderAttr.series,
            gross_amount: rupiahFormat(orderAttr.gross_amount),
            payment_type: paymentTypeMapper[orderAttr.payment_type],
            channel_name: orderAttr.channel_name.toUpperCase(),
            virtual_number: orderAttr.virtual_number,
            permata_va_number: orderAttr.permata_va_number,
            bill_key: orderAttr.bill_key,
            biller_code: orderAttr.biller_code,
            payment_code: orderAttr.payment_code,
            status: orderAttr.status,
            paid_at: moment(orderAttr.paid_at).format('DD MMM YYYY | HH:mm'),
        },
    }),
};
