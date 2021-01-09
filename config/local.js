module.exports = {
    webserver: {
        port: 3001
    },
    redis: {
        host: "localhost",
        port: 6380,
    },
    log4js: {
        appenders: {
            console: {type: "console"},
            file: {type: "file", filename: "flow.log"},
        },
        categories: {
            default: {
                appenders: ["console", "file"], level: 'trace'
            }
        }
    },
    metrics: {
        enabled: true,
    }
};