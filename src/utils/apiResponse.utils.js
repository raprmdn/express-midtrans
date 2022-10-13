const { StatusCodes } = require('http-status-codes');

const errorsCustomMessage = (errors) => errors.details.reduce((acc, curr) => ({
    ...acc,
    [curr.path]: curr.message,
}), {});

module.exports = {
    apiResponse: (code, status, message, data) => {
        const result = {};
        result.code = code || StatusCodes.OK;
        result.status = status || 'OK';
        result.message = message;
        result.data = data;

        return result;
    },
    apiResponseValidationError: (errors) => {
        const result = {};
        result.code = StatusCodes.UNPROCESSABLE_ENTITY;
        result.status = 'UNPROCESSABLE_ENTITY';
        result.message = 'The given data was invalid.';
        result.errors = errorsCustomMessage(errors);

        return result;
    },
    notFoundResponse: (message) => {
        const result = {};
        result.code = StatusCodes.NOT_FOUND;
        result.status = 'NOT_FOUND';
        result.message = `${message} not found`;

        return result;
    },
    unauthorizedResponse: (message) => {
        const result = {};
        result.code = StatusCodes.UNAUTHORIZED;
        result.status = 'UNAUTHORIZED';
        result.message = `Unauthorized. ${message}`;

        return result;
    },
    noContentResponse: (message) => {
        const result = {};
        result.code = StatusCodes.NO_CONTENT;
        result.status = 'NO_CONTENT';
        result.message = message;

        return result;
    },
    badRequestResponse: (message) => {
        const result = {};
        result.code = StatusCodes.BAD_REQUEST;
        result.status = 'BAD_REQUEST';
        result.message = message;

        return result;
    },
};
