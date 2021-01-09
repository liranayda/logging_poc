const config = require('config');
const logging = require('../utils/logging');
const logger = logging.getLogger('authentication');

module.exports = function (req, res, next) {
    if (!config.authenticationEnabled) {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        logger.debug(`user not authenticated`, {authHeader})
        return res.send(401);
    }
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const {isAuthenticated} = Math.random() > 0.5;
        if (!isAuthenticated) {
            logger.debug(`user not authenticated`, {authHeader})
            return res.send(401);
        }
        next()
    } catch (error) {
        logger.error(`error while trying to authenticate user`, {error, authHeader})
        return res.send(401);
    }
}