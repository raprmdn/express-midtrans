const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hash) => bcrypt.compare(password, hash),
};
