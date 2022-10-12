const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require("../utils/apiResponse.utils");

module.exports = {
    index: async () => {
        try {
            return apiResponse(status.OK, 'OK', 'Hello World!');
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
}