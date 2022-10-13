module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Videos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            series_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Series',
                    key: 'id',
                    as: 'series_id',
                },
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            source: {
                type: Sequelize.STRING,
            },
            episode: {
                type: Sequelize.INTEGER,
            },
            runtime: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Videos');
    },
};
