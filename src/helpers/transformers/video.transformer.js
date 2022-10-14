const { castingRuntimeVideo } = require('../casts.helper');

const objVideo = (video) => ({
    id: video.id,
    title: video.title,
    source: video.source,
    episode: video.episode,
    runtime: castingRuntimeVideo(video),
    is_free: video.is_free,
    created_at: video.created_at,
});

module.exports = {
    VideoTransformer: (video) => objVideo(video),
};
