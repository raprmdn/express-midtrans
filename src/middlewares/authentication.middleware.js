const {
    unauthorizedResponse,
    noContentResponse,
} = require('../utils/apiResponse.utils');
const {
    verifyAccessToken,
    verifyRefreshToken,
} = require('../utils/jwt.utils');

// eslint-disable-next-line consistent-return
const tokenErr = (e) => {
    if (e.name === 'TokenExpiredError') {
        return unauthorizedResponse('Token Expired. Please login again.');
    }
    if (e.name === 'JsonWebTokenError') {
        return unauthorizedResponse('Invalid Token.');
    }
};

module.exports = {
    // eslint-disable-next-line consistent-return
    authentication: (req, res, next) => {
        try {
            const bearer = req.headers.authorization;
            if (!bearer) throw unauthorizedResponse();

            const token = bearer.split(' ')[1];
            if (!token) throw unauthorizedResponse();

            req.user = verifyAccessToken(token);

            next();
        } catch (e) {
            const err = tokenErr(e);
            if (err) return res.status(err.code).json(err);
            return res.status(e.code).json(e);
        }
    },
    // eslint-disable-next-line consistent-return
    refreshToken: (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) throw noContentResponse('No Refresh Token Provided');

            req.refreshToken = verifyRefreshToken(refreshToken);

            next();
        } catch (e) {
            const err = tokenErr(e);
            if (err) return res.status(err.code).json(err);
            return res.status(e.code).json(e);
        }
    },
};
