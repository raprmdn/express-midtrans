const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Cart, {
                foreignKey: 'user_id',
                as: 'carts',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            User.hasMany(models.Order, {
                foreignKey: 'user_id',
                as: 'orders',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            User.belongsToMany(models.Series, {
                through: 'purchased_series',
                foreignKey: 'user_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255,
        },
    }, {
        sequelize,
        modelName: 'User',
        underscored: true,
    });
    return User;
};
