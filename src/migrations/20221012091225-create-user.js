'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                maxLength: 255
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                maxLength: 255,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                maxLength: 255,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                maxLength: 255
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};