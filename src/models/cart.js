const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            Cart.belongsTo(models.Series, {
                foreignKey: 'series_id',
                as: 'series',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Cart.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        series_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Series',
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Cart',
        underscored: true,
    });
    return Cart;
};
