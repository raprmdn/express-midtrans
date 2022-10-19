const SeriesService = require('../services/series.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await SeriesService.index();
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    show: async (req, res) => {
        try {
            const serviceResponse = await SeriesService.show(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
