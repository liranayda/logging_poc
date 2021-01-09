const log4js = require('log4js');
const config = require('config');

log4js.configure(config.log4js);

function getLogger(name) {
    return log4js.getLogger(name)
}

module.exports = {getLogger};