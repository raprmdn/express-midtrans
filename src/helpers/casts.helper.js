const moment = require('moment');

module.exports = {
    rupiahFormat: (number) => Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number),
    castingRuntimeSeries: (series) => {
        const durations = series.videos.map((video) => ({
            runtime: video.runtime,
        }));

        const runtimes = durations.reduce((acc, curr) => (
            acc + moment.duration(curr.runtime).asSeconds()
        ), 0);

        const raw = moment.utc(runtimes * 1000).format('HH:mm:ss');
        const hours = moment.duration(runtimes, 'seconds').hours();
        const minutes = moment.duration(runtimes, 'seconds').minutes();
        const seconds = moment.duration(runtimes, 'seconds').seconds();

        return {
            raw, hours, minutes, seconds,
        };
    },
    castingRuntimeVideo: (video) => {
        const raw = video.runtime;
        const hours = moment.duration(raw, 'seconds').hours();
        const minutes = moment.duration(raw, 'seconds').minutes();
        const seconds = moment.duration(raw, 'seconds').seconds();

        return {
            raw, hours, minutes, seconds,
        };
    },
};
