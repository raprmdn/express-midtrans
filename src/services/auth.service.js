const { StatusCodes: status } = require('http-status-codes');
const { User } = require('../models');
const {
    apiResponse,
    badRequestResponse,
    notFoundResponse,
} = require('../utils/apiResponse.utils');
const { hashPassword, comparePassword } = require('../utils/bcrypt.utils');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt.utils');

module.exports = {
    register: async (payload) => {
        try {
            const {
                name, username, email, password,
            } = payload;
            const hashedPassword = await hashPassword(password);

            const user = await User.create({
                name, username, email, password: hashedPassword,
            });
            user.password = undefined;

            return apiResponse(status.CREATED, 'CREATED', 'Success create a new account');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    login: async (payload) => {
        try {
            const { email, password } = payload;
            const user = await User.findOne({
                where: { email },
                attributes: { exclude: ['created_at', 'updated_at'] },
            });

            if (!user) throw badRequestResponse('These credentials do not match our records');
            if (!await comparePassword(password, user.password)) throw badRequestResponse('These credentials do not match our records');

            user.password = undefined;
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            return apiResponse(status.OK, 'OK', 'Success login', { user, accessToken, refreshToken });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    me: async (decoded) => {
        try {
            const { id } = decoded;
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password', 'created_at', 'updated_at'] },
            });

            if (!user) throw notFoundResponse('User');

            return apiResponse(status.OK, 'OK', 'Success get authenticated user', { user });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    refreshToken: async (refreshToken) => {
        try {
            const { id } = refreshToken;
            const user = await User.findByPk(id);
            if (!user) throw notFoundResponse('User');

            const accessToken = generateAccessToken(user);

            return apiResponse(status.OK, 'OK', 'Success create new access token', { accessToken });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
};
