const CartService = require('../services/cart.service');

module.exports = {
    index: async (req, res) => {
        try {
            const responseService = await CartService.index(req);
            return res.status(responseService.code).json(responseService);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    addOrRemove: async (req, res) => {
        try {
            const serviceResponse = await CartService.addOrRemove(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
