const log4js = require("log4js");

const LOG_LEVEL = "info";

log4js.configure({
    appenders: {
        console: {type: "console"},
        file: {type: "file", filename: "flow.log"},
    },
    categories: {
        default: {
            appenders: ["console", "file"], level: LOG_LEVEL
        }
    }
});

const logger = log4js.getLogger("demo");
logger.trace("This is a TRACE message");
logger.debug("This is a DEBUG message");
logger.info("This is an INFO message");
logger.warn("This is a WARN message");
logger.error("This is an ERROR message");
logger.fatal("This is a FATAL message");
