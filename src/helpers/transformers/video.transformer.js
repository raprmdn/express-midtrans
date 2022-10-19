const { castingRuntimeVideo } = require('../casts.helper');

const objVideo = (video, hasPurchased) => {
    let source = video.is_free ? video.source : null;

    if (hasPurchased) source = video.source;

    return {
        id: video.id,
        title: video.title,
        source,
        episode: video.episode,
        runtime: castingRuntimeVideo(video),
        is_free: video.is_free,
        created_at: video.created_at,
    };
};

module.exports = {
    VideoTransformer: (video, hasPurchased = false) => objVideo(video, hasPurchased),
};
