const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Unautorized'})
        }

        const data = tokenService.validateAccess(token)

        if (!data || (!data.id && !data._id)) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = data
        next()
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
}