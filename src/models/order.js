const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Order.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        invoice: {
            type: DataTypes.STRING,
            unique: true,
        },
        identifier: {
            type: DataTypes.STRING,
            unique: true,
        },
        series: {
            type: DataTypes.JSON,
        },
        gross_amount: {
            type: DataTypes.DOUBLE.UNSIGNED,
        },
        payment_type: {
            type: DataTypes.STRING,
        },
        channel_name: {
            type: DataTypes.STRING,
        },
        virtual_number: {
            type: DataTypes.STRING,
        },
        permata_va_number: {
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
        actions: {
            type: DataTypes.JSON,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
        },
        status_code: {
            type: DataTypes.STRING,
        },
        transaction_time: {
            type: DataTypes.DATE,
        },
        paid_at: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Order',
        underscored: true,
    });
    return Order;
};
