const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponseValidationError } = require('../apiResponse.utils');
const { isUsernameExistsJoi, isEmailExistsJoi } = require('../../helpers/exists.helper');

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

module.exports = {
    // eslint-disable-next-line consistent-return
    registerValidation: async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().max(255).required().label('Name'),
            username: Joi.string().max(255)
                .required()
                .regex(/^[a-zA-Z0-9-_]+$/)
                .label('Username')
                .external(async (username) => isUsernameExistsJoi(username))
                .options({ messages: { 'string.pattern.base': 'Username must only contains alphanumeric, dash, and underscore' } }),
            email: Joi.string().email().max(255).required()
                .label('Email')
                .external(async (email) => isEmailExistsJoi(email)),
            password: passwordComplexity().required().label('Password'),
            password_confirmation: Joi.any().valid(Joi.ref('password')).required().label('Password Confirmation')
                .options({ messages: { 'any.only': 'Password and {{#label}} does not match' } }),
        });

        try {
            await schema.validateAsync(req.body, { abortEarly: false, ...options });
            next();
        } catch (e) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(e));
        }
    },
    // eslint-disable-next-line consistent-return
    loginValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().max(255).required()
                .label('Email'),
            password: Joi.string().required().label('Password'),
        });

        const { error } = schema.validate(req.body, { abortEarly: false, ...options });
        if (error) {
            return res.status(status.UNPROCESSABLE_ENTITY).json(apiResponseValidationError(error));
        }

        next();
    },
};
