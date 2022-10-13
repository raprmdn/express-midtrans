module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Series', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                max: 255,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.TEXT,
            },
            episodes: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.DOUBLE.UNSIGNED,
            },
            discount_price: {
                type: Sequelize.DOUBLE.UNSIGNED,
            },
            preview_series: {
                type: Sequelize.STRING,
                max: 255,
            },
            source_code: {
                type: Sequelize.STRING,
                max: 255,
            },
            is_discount: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_free: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Series');
    },
};
