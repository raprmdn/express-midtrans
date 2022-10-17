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

module.exports = {
    SeriesTransformer: (series) => ({
        ...objSeries(series),
        runtime: castingRuntimeSeries(series),
    }),
    SeriesShowTransformer: (series) => ({
        ...objSeries(series),
        runtime: castingRuntimeSeries(series),
        videos: series.videos.map((video) => VideoTransformer(video)),
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
