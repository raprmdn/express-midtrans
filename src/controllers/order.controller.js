const OrderService = require('../services/order.service');

module.exports = {
    order: async (req, res) => {
        try {
            const serviceResponse = await OrderService.order(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    notificationHandler: async (req, res) => {
        try {
            const serviceResponse = await OrderService.notificationHandler(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
