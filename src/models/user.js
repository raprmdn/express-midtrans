'use strict';
const {
    Model
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
        }
    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 255
        },
    }, {
        sequelize,
        modelName: 'User',
        underscored: true,
    });
    return User;
};