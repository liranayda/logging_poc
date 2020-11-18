const log4js = require("log4js");
log4js.configure({
    appenders: {
        console: {type: "console"},
        file: {type: "file", filename: "cheese.log"},
    },
    categories: {
        default: {
            appenders: ["console", "file"], level: "error"
        }
    }
});

const logger = log4js.getLogger("cheese");
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
