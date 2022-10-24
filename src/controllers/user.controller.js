const UserService = require('../services/user.service');

module.exports = {
    myLibrary: async (req, res) => {
        try {
            const serviceResponse = await UserService.myLibrary(req.user);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    },
};
