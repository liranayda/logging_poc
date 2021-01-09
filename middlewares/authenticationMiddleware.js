const config = require('config');

module.exports = function (req, res, next) {
    if (!config.authenticationEnabled) {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.send(401);
    }
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const { isAuthenticated } = Math.random() > 0.5;
        if (!isAuthenticated) {
            return res.send(401);
        }
        next()
    } catch (error) {
        return res.send(401);
    }
}