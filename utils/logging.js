const _ = require('lodash');
const log4js = require('log4js');
const config = require('../config');
const {version} = require('../package');
const clsHooked = require('cls-hooked');
const LOG_LEVEL = config.log4js.level;

function accessLogFormatter(req, res) {
    const correlationIdNamespace = clsHooked.getNamespace('correlationIdNamespace');
    return {
        url: req.originalUrl,
        method: req.method,
        status: res.__statusCode || res.statusCode,
        countryCode: (req.cd && req.cd.cc) || 'countryNotFound',
        'response-time': res.responseTime,
        referrer: req.headers.referer || req.headers.referrer || '',
        'http-version': req.httpVersionMajor + '.' + req.httpVersionMinor,
        'user-agent': req.headers['user-agent'] || '',
        'content-length': (res._headers && res._headers['content-length']) || (res.__headers && res.__headers['Content-Length']) || -1,
        acid: correlationIdNamespace && correlationIdNamespace.get('requestData') && correlationIdNamespace.get('requestData')[0]
    };
}

function getLogger(name, level) {
    if (!name) {
        name = 'UnknownLogger';
    }
    const logger = log4js.getLogger(name);
    if (level && log4js.levels.hasOwnProperty(level)) {
        logger.setLevel(level);
    }
    const timersLevel = _.isFunction(logger[config.log4js.timerLogLevel]) ? config.log4js.timerLogLevel : 'debug';
    logger.times = {};

    logger.time = config.log4js.activateTimers ? function time(label) {
        logger.times[label] = Date.now();
    } : _.noop;

    logger.timeEnd = config.log4js.activateTimers ? function timeEnd(label) {
        const time = logger.times[label];
        if (!time) {
            return;
        }
        const duration = Date.now() - time;
        logger[timersLevel]({type: 'time', label, duration});
    } : _.noop;
    logger.debugReport = (msg) => {
        const correlationIdNamespace = clsHooked.getNamespace('correlationIdNamespace');
        if (!(correlationIdNamespace && correlationIdNamespace.active)) {
            return null;
        } else {
            const [acid, debug] = correlationIdNamespace.get('requestData')
            if (!debug) {
                return;
            }
            msg.acid = acid;
            logger.debuginfo(msg)
        }
    }
    logger.debugActions = {
        APP_DROPPED: 'APP_DROPPED',
        APP_ADDED: 'APP_ADDED',
        MISC: 'MISC',
        ENOAPP: 'ENOAPP',
        RANKING_FALLBACK: 'RANKING_FALLBACK',
        DYNAMIC_FILTERS: 'DYNAMIC_FILTERS',
        DYNAMIC_RULES: 'DYNAMIC_RULES'
    }

    return logger;
}

function formatLogOutput(logEvent, config, acid) {
    const [data, ...additionalDataArray] = _.get(logEvent, 'data', []);
    const additionalData = Object.assign({}, ...additionalDataArray);
    const log = {
        startTime: logEvent.startTime,
        categoryName: logEvent.categoryName,
        level: logEvent.level.levelStr,
        source: config.source,
        apeVersion: version,
        acid: acid
    };

    return JSON.stringify(logEvent.categoryName === 'access' ? {...log, ...data} : {
        ...log,
        data, ...additionalData
    });
}


function formatDebugOutput(logEvent, config) {
    const [data, ...additionalDataArray] = _.get(logEvent, 'data', []);
    const additionalData = Object.assign({}, ...additionalDataArray);
    const log = {
        startTime: logEvent.startTime,
        categoryName: logEvent.categoryName,
        level: logEvent.level.levelStr,
        source: config.source,
        apeVersion: version,
        acid: data.acid
    };

    return JSON.stringify({...log, ...data, ...additionalData}
    );
}

const jsonLayout = function (config) {
    return function (logEvent) {
        const correlationIdNamespace = clsHooked.getNamespace('correlationIdNamespace');
        if (correlationIdNamespace && correlationIdNamespace.active) {
            const [acid, ] = correlationIdNamespace.get('requestData')
            return formatLogOutput(logEvent, config, acid);
        }
        return formatLogOutput(logEvent, config);
    };
};

const debugInfo = function (config) {
    return function (logEvent) {
        return formatDebugOutput(logEvent, config);
    };
};


const source = `${config.whitelabel}/${config.environment}`;

log4js.addLayout('debuginfo', debugInfo);
log4js.addLayout('json', jsonLayout);

if (config.log4js.jsonLayout === 'json') {
    log4js.configure({
        levels: {
            debuginfo: {
                value: 50001, colour: 'grey'
            }
        },
        appenders: {
            out: {type: 'stdout', layout: {type: 'json', source}},
            outLogger: {type: 'logLevelFilter', appender: 'out', level: 'info', maxLevel: 'FATAL'},
            debugLevel: {type: 'stdout', layout: {type: 'debuginfo', source}},
            debugLogger: {type: 'logLevelFilter', appender: 'debugLevel', level: 'debuginfo', maxLevel: 'debuginfo'}

        },
        categories: {
            default: {
                appenders: ['debugLogger', 'outLogger'],
                level: config.log4js.level,
                enableCallStack: ['DEBUG', 'TRACE'].includes(config.log4js.level)
            }
        }
    })
} else {
    log4js.configure({
        appenders: config.log4js.appenders,
        categories: config.log4js.categories
    });
}

const logger = getLogger('Logging');
logger.info("Configured log4js with default level: " + LOG_LEVEL);


module.exports = {
    accessLogFormatter,
    getLogger
};