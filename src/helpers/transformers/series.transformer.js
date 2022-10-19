const { Cart } = require('../../models');
const { rupiahFormat, castingRuntimeSeries } = require('../casts.helper');
const { VideoTransformer } = require('./video.transformer');

const objSeries = (series) => ({
    id: series.id,
    title: series.title,
    slug: series.slug,
    description: series.description,
    episodes: series.episodes,
    price: {
        raw: series.price,
        formatted: series.price && rupiahFormat(series.price),
    },
    discount_price: {
        raw: series.discount_price,
        formatted: series.discount_price && rupiahFormat(series.discount_price),
    },
    preview_series: series.preview_series,
    source_code: series.source_code,
    is_discount: series.is_discount,
    is_free: series.is_free,
    created_at: series.created_at,
});

const hasPurchased = async (series, user) => {
    if (!user) return false;
    return !!(await series.hasUser(user.id));
};

const isExistsInCart = async (series, user) => {
    if (!user) return false;
    return !!(await Cart.count({ where: { series_id: series.id, user_id: user.id } }));
};

module.exports = {
    SeriesTransformer: (series) => ({
        ...objSeries(series),
        runtime: castingRuntimeSeries(series),
    }),
    SeriesShowTransformer: async (series, user) => ({
        ...objSeries(series),
        runtime: castingRuntimeSeries(series),
        videos: series.videos.map((video) => {
            const objVideo = VideoTransformer(video);
            delete objVideo.source;

            return objVideo;
        }),
        viewing_status: {
            is_free: series.is_free,
            has_purchased: await hasPurchased(series, user),
            is_exists_in_cart: await isExistsInCart(series, user),
            is_discount: series.is_discount,
        },
    }),
    SeriesCartTransformer: (series) => {
        const seriesObj = objSeries(series);
        delete seriesObj.description;
        delete seriesObj.episodes;
        delete seriesObj.preview_series;
        delete seriesObj.source_code;
        delete seriesObj.is_free;
        delete seriesObj.created_at;

        return seriesObj;
    },
};
