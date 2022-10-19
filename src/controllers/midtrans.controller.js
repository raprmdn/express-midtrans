const MidtransService = require('../services/midtrans.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await MidtransService.index();
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await MidtransService.show(req.params.order_id);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
