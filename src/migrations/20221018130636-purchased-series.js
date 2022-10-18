module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchased_series', {
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                primaryKey: true,
            },
            series_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Series',
                    key: 'id',
                },
                primaryKey: true,
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
        await queryInterface.dropTable('purchased_series');
    },
};
