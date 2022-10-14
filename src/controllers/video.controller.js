const VideoService = require('../services/video.service');

module.exports = {
    watch: async (req, res) => {
        try {
            const serviceResponse = await VideoService.watch(req.params.slug, req.params.episode);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
