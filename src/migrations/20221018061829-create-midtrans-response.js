module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('midtrans_responses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            order_id: {
                type: Sequelize.STRING,
            },
            bank: {
                type: Sequelize.STRING,
            },
            va_number: {
                type: Sequelize.STRING,
            },
            payment_type: {
                type: Sequelize.STRING,
            },
            store: {
                type: Sequelize.STRING,
            },
            permata_va_number: {
                type: Sequelize.STRING,
            },
            status_code: {
                type: Sequelize.STRING,
            },
            status_message: {
                type: Sequelize.STRING,
            },
            transaction_id: {
                type: Sequelize.STRING,
            },
            merchant_id: {
                type: Sequelize.STRING,
            },
            gross_amount: {
                type: Sequelize.STRING,
            },
            currency: {
                type: Sequelize.STRING,
            },
            transaction_time: {
                type: Sequelize.STRING,
            },
            transaction_status: {
                type: Sequelize.STRING,
            },
            fraud_status: {
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
            signature_key: {
                type: Sequelize.STRING,
            },
            acquirer: {
                type: Sequelize.STRING,
            },
            settlement_time: {
                type: Sequelize.STRING,
            },
            approval_code: {
                type: Sequelize.STRING,
            },
            actions: {
                type: Sequelize.JSON,
            },
            response_body: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable('midtrans_responses');
    },
};
