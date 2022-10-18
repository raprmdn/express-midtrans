const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MidtransResponse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    MidtransResponse.init({
        order_id: {
            type: DataTypes.STRING,
        },
        bank: {
            type: DataTypes.STRING,
        },
        va_number: {
            type: DataTypes.STRING,
        },
        payment_type: {
            type: DataTypes.STRING,
        },
        store: {
            type: DataTypes.STRING,
        },
        permata_va_number: {
            type: DataTypes.STRING,
        },
        status_code: {
            type: DataTypes.STRING,
        },
        status_message: {
            type: DataTypes.STRING,
        },
        transaction_id: {
            type: DataTypes.STRING,
        },
        merchant_id: {
            type: DataTypes.STRING,
        },
        gross_amount: {
            type: DataTypes.STRING,
        },
        currency: {
            type: DataTypes.STRING,
        },
        transaction_time: {
            type: DataTypes.STRING,
        },
        transaction_status: {
            type: DataTypes.STRING,
        },
        fraud_status: {
            type: DataTypes.STRING,
        },
        bill_key: {
            type: DataTypes.STRING,
        },
        biller_code: {
            type: DataTypes.STRING,
        },
        payment_code: {
            type: DataTypes.STRING,
        },
        signature_key: {
            type: DataTypes.STRING,
        },
        acquirer: {
            type: DataTypes.STRING,
        },
        settlement_time: {
            type: DataTypes.STRING,
        },
        approval_code: {
            type: DataTypes.STRING,
        },
        actions: {
            type: DataTypes.JSON,
        },
        response_body: {
            type: DataTypes.JSON,
        },
    }, {
        sequelize,
        modelName: 'MidtransResponse',
        underscored: true,
        tableName: 'midtrans_responses',
    });
    return MidtransResponse;
};
