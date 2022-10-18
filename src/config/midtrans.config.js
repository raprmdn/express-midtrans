const midtrans = require('midtrans-client');

module.exports = {
    CoreAPI: new midtrans.CoreApi({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    }),
};
