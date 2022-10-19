const { StatusCodes: status } = require('http-status-codes');
const { Series, Video } = require('../models');
const {
    apiResponse,
    notFoundResponse,
} = require('../utils/apiResponse.utils');
const { SeriesTransformer } = require('../helpers/transformers/series.transformer');
const { VideoTransformer } = require('../helpers/transformers/video.transformer');

module.exports = {
    watch: async (req) => {
        try {
            const { slug, episode } = req.params;
            const { user } = req;

            let series = await Series.findOne({
                where: { slug },
                include: [
                    {
                        association: 'videos',
                    },
                ],
            });
            if (!series) throw notFoundResponse('Series');
            const hasPurchased = user ? await series.hasUser(user.id) : false;

            const video = await Video.findOne({ where: { series_id: series.id, episode } });
            if (!video) throw notFoundResponse('Video');

            const currentVideo = VideoTransformer(video, hasPurchased);
            const attributes = {
                has_next: series.videos.length > episode,
                has_prev: episode > 1,
            };
            attributes.next_episode = attributes.has_next ? +episode + 1 : null;
            attributes.prev_episode = attributes.has_prev ? episode - 1 : null;
            attributes.next_video = attributes.has_next
                // eslint-disable-next-line max-len
                ? VideoTransformer(series.videos.find((v) => v.episode === attributes.next_episode), hasPurchased)
                : null;

            const videos = series.videos.map((v) => VideoTransformer(v, hasPurchased));
            series = SeriesTransformer(series);

            return apiResponse(status.OK, 'OK', 'Get Video successfully', {
                authenticated: !!user,
                series,
                video: {
                    current_video: currentVideo,
                    attributes,
                },
                videos,
            });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
