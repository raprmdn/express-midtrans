const { StatusCodes: status } = require('http-status-codes');
const { MidtransResponse } = require('../models');
const {
    apiResponse,
    notFoundResponse,
} = require('../utils/apiResponse.utils');

module.exports = {
    index: async () => {
        try {
            const response = await MidtransResponse.findAll();
            return apiResponse(status.OK, 'OK', 'Success get Midtrans Response', { midtrans: response });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (orderId) => {
        try {
            const response = await MidtransResponse.findAll({ where: { order_id: orderId } });
            if (!response.length) throw notFoundResponse('Midtrans Response not found');

            return apiResponse(status.OK, 'OK', 'Success get Midtrans Response', { midtrans: response });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
