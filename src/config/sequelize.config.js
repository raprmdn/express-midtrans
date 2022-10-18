require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
            underscoredAll: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
            underscoredAll: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            underscored: true,
            underscoredAll: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
};
