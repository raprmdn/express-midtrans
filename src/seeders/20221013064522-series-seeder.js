module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('series', [
            {
                title: 'Series 1',
                slug: 'series-1',
                description: 'Series 1 description',
                episodes: 10,
                price: 125000,
                discount_price: null,
                preview_series: 'cM963tI7Q_k',
                source_code: 'https://github.com/raprmdn/express-midtrans',
                is_discount: false,
                is_free: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: 'Series 2',
                slug: 'series-2',
                description: 'Series 2 description',
                episodes: 5,
                price: null,
                discount_price: null,
                preview_series: 'cM963tI7Q_k',
                source_code: 'https://github.com/raprmdn/express-midtrans',
                is_discount: false,
                is_free: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: 'Series 3',
                slug: 'series-3',
                description: 'Series 3 description',
                episodes: 10,
                price: 200000,
                discount_price: 150000,
                preview_series: 'cM963tI7Q_k',
                source_code: 'https://github.com/raprmdn/express-midtrans',
                is_discount: true,
                is_free: false,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('series', null, {});
    },
};
