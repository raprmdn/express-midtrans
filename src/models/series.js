const {
    Model,
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Series.hasMany(models.Video, {
                foreignKey: 'series_id',
                as: 'videos',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            });
            Series.hasMany(models.Cart, {
                foreignKey: 'series_id',
                as: 'carts',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }
    Series.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 255,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
        episodes: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.DOUBLE.UNSIGNED,
        },
        discount_price: {
            type: DataTypes.DOUBLE.UNSIGNED,
        },
        preview_series: {
            type: DataTypes.STRING,
            max: 255,
        },
        source_code: {
            type: DataTypes.STRING,
            max: 255,
        },
        is_discount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_free: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Series',
        underscored: true,
        getterMethods: {
            created_at() {
                return moment(this.getDataValue('created_at')).format('DD MMMM YYYY, HH:mm A');
            },
        },
    });
    return Series;
};
