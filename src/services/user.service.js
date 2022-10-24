const { StatusCodes: status } = require('http-status-codes');
const { User } = require('../models');
const {
    apiResponse,
    notFoundResponse,
} = require('../utils/apiResponse.utils');
const { SeriesTransformer } = require('../helpers/transformers/series.transformer');

module.exports = {
    myLibrary: async (user) => {
        try {
            const auth = await User.findByPk(user.id);
            if (!auth) throw notFoundResponse('User');

            let series = await auth.getSeries({
                joinTableAttributes: [],
                include: [
                    {
                        association: 'videos',
                    },
                ],
            });
            series = series.map((item) => SeriesTransformer(item));

            return apiResponse(status.OK, 'OK', 'Success get purchased series', { series });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
