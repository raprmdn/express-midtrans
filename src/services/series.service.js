const { StatusCodes: status } = require('http-status-codes');
const { Series } = require('../models');
const { apiResponse } = require('../utils/apiResponse.utils');
const { SeriesTransformer, SeriesShowTransformer } = require('../helpers/transformers/series.transformer');

module.exports = {
    index: async () => {
        try {
            let series = await Series.findAll({
                attributes: { exclude: ['updated_at'] },
                include: [
                    {
                        association: 'videos',
                        attributes: ['id', 'series_id', 'runtime'],
                    },
                ],
                order: [['id', 'DESC']],
            });
            series = series.map((item) => SeriesTransformer(item));

            return apiResponse(status.OK, 'OK', 'Series retrieved successfully', { series });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (req) => {
        try {
            const { user } = req;
            const { slug } = req.params;
            let series = await Series.findOne({
                where: { slug },
                include: [
                    {
                        association: 'videos',
                        attributes: { exclude: ['updated_at'] },
                    },
                ],
                order: [['videos', 'episode', 'ASC']],
            });
            series = await SeriesShowTransformer(series, user);

            return apiResponse(status.OK, 'OK', 'Get Series successfully', { authenticated: !!user, series });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
