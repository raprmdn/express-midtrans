const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Video.belongsTo(models.Series, {
                foreignKey: 'series_id',
                as: 'series',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            });
        }
    }
    Video.init({
        series_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Series',
                key: 'id',
                as: 'series_id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        source: {
            type: DataTypes.STRING,
        },
        episode: {
            type: DataTypes.INTEGER,
        },
        runtime: {
            type: DataTypes.STRING,
        },
        is_free: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Video',
        underscored: true,
    });
    return Video;
};
