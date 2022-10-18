module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            invoice: {
                type: Sequelize.STRING,
                unique: true,
            },
            identifier: {
                type: Sequelize.STRING,
                unique: true,
            },
            series: {
                type: Sequelize.JSON,
            },
            gross_amount: {
                type: Sequelize.DOUBLE.UNSIGNED,
            },
            payment_type: {
                type: Sequelize.STRING,
            },
            channel_name: {
                type: Sequelize.STRING,
            },
            virtual_number: {
                type: Sequelize.STRING,
            },
            permata_va_number: {
                type: Sequelize.STRING,
            },
            bill_key: {
                type: Sequelize.STRING,
            },
            biller_code: {
                type: Sequelize.STRING,
            },
            payment_code: {
                type: Sequelize.STRING,
            },
            actions: {
                type: Sequelize.JSON,
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'pending',
            },
            status_code: {
                type: Sequelize.STRING,
            },
            transaction_time: {
                type: Sequelize.DATE,
            },
            paid_at: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('Orders');
    },
};
