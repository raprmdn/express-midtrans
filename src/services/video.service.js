const { StatusCodes: status } = require('http-status-codes');
const { Series, Video } = require('../models');
const {
    apiResponse,
    notFoundResponse,
} = require('../utils/apiResponse.utils');
const { SeriesTransformer } = require('../helpers/transformers/series.transformer');
const { VideoTransformer } = require('../helpers/transformers/video.transformer');

module.exports = {
    watch: async (slug, episode) => {
        try {
            let series = await Series.findOne({
                where: { slug },
                include: [
                    {
                        association: 'videos',
                    },
                ],
            });
            if (!series) throw notFoundResponse('Series');

            const video = await Video.findOne({ where: { series_id: series.id, episode } });
            if (!video) throw notFoundResponse('Video');

            const currentVideo = VideoTransformer(video);
            const attributes = {
                has_next: series.videos.length > episode,
                has_prev: episode > 1,
            };
            attributes.next_episode = attributes.has_next ? +episode + 1 : null;
            attributes.prev_episode = attributes.has_prev ? episode - 1 : null;
            attributes.next_video = attributes.has_next
                ? VideoTransformer(series.videos.find((v) => v.episode === attributes.next_episode))
                : null;
            const videos = series.videos.map((v) => VideoTransformer(v));
            series = SeriesTransformer(series);

            return apiResponse(status.OK, 'OK', 'Get Video successfully', {
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
