const { StatusCodes: status } = require('http-status-codes');
const { User, Series } = require('../models');
const {
    apiResponse,
    notFoundResponse,
    badRequestResponse,
} = require('../utils/apiResponse.utils');
const { CartSummaryTransformer } = require('../helpers/transformers/cart.transformer');
const { SeriesCartTransformer } = require('../helpers/transformers/series.transformer');

module.exports = {
    index: async (req) => {
        try {
            const { id } = req.user;
            const user = await User.findByPk(id);
            if (!user) throw notFoundResponse('User');

            const carts = await user.getCarts({
                include: [{
                    association: 'series',
                }],
            });
            const cartSummary = CartSummaryTransformer(carts);
            const cartIds = carts.map((cart) => cart.id);
            const cartSeries = carts.map((cart) => SeriesCartTransformer(cart.series));

            return apiResponse(status.OK, 'OK', 'Success get carts', {
                cart_summary: cartSummary,
                cart_ids: cartIds,
                cart_series: cartSeries,
            });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    addOrRemove: async (req) => {
        try {
            const seriesId = req.body.series_id;
            const { id } = req.user;

            const series = await Series.findByPk(seriesId);
            if (!series) throw notFoundResponse('Series');
            if (series.is_free || series.price === null) throw badRequestResponse('Cannot add free series to cart');

            const user = await User.findByPk(id);
            if (!user) throw notFoundResponse('User');

            const seriesInCart = await user.getCarts({ where: { series_id: series.id } });
            if (seriesInCart.length) {
                await seriesInCart[0].destroy();
                return apiResponse(status.OK, 'OK', 'Success remove series from cart');
            }

            await user.createCart({ series_id: series.id });

            return apiResponse(status.OK, 'OK', 'Success add series to cart');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
