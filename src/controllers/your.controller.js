const YourService = require('../services/your.service');

module.exports = {
    index: async (req, res) => {
        try {
            const serviceResponse = await YourService.index(req);
            return res.status(serviceResponse.code).json(serviceResponse);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
}