module.exports = {
    channels: (channel) => {
        const channels = ['bri', 'bca', 'bni', 'mandiri', 'permata', 'gopay', 'alfamart', 'indomaret'];
        return channels.includes(channel);
    },
};
