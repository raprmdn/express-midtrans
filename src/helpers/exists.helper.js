const Joi = require('joi');
const { User } = require('../models');

const customThrowErrorJoiString = (msg, field) => {
    throw new Joi.ValidationError(
        msg,
        [
            {
                message: msg,
                path: [field],
                type: `string.${field}`,
                context: {
                    key: field,
                    label: field,
                    field,
                },
            },
        ],
        field,
    );
};

module.exports = {
    isUsernameExistsJoi: async (username) => {
        const user = await User.findOne({ where: { username } });
        if (user) customThrowErrorJoiString('Username already been taken', 'username');

        return true;
    },
    isEmailExistsJoi: async (email) => {
        const user = await User.findOne({ where: { email } });
        if (user) customThrowErrorJoiString('Email already been taken', 'email');

        return true;
    },
};
