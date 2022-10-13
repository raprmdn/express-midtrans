const { StatusCodes: status } = require('http-status-codes');
const AuthService = require('../services/auth.service');
const {
    apiResponse,
    noContentResponse,
} = require('../utils/apiResponse.utils');

module.exports = {
    register: async (req, res) => {
        try {
            const serviceResponse = await AuthService.register(req.body);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    login: async (req, res) => {
        try {
            const serviceResponse = await AuthService.login(req.body);
            res.cookie('refreshToken', serviceResponse.data.refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    me: async (req, res) => {
        try {
            const serviceResponse = await AuthService.me(req.user);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
    logout: async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) throw noContentResponse('No Refresh Token Provided');

            res.clearCookie('refreshToken');

            return res.status(status.OK).json(apiResponse(status.OK, 'OK', 'Logout successful'));
        } catch (e) {
            return res.status(e.code || status.INTERNAL_SERVER_ERROR).json(
                apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message),
            );
        }
    },
    refreshToken: async (req, res) => {
        try {
            const serviceResponse = await AuthService.refreshToken(req.refreshToken);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
