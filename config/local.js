module.exports = {
    whitelabel: "ironsource",
    environment: "anqa",
    etl: {
        version: "20180722",
    },
    webserver: {
        port: 3002,
        trustProxy: true,
    },
    redis: {
        host: "localhost",
        port: 6380,
    },
    pubsub: {
        redis: {
            host: "localhost",
            port: 6380,
        },
    },
    memcache: {
        enabled: false,
    },
    log4js: {
        level: "DEBUG",
        jsonLayout: "json",
        activateTimers: false,
    },
    reporting: {
        request: {
            enabled: false,
        },
        event: {
            enabled: false,
        },
    },
    cacheExpiration: {
        refData: 900,
    },
    caching: {
        enabled: true,
    },
    metrics: {
        enabled: true,
    },
    geoip: {
        path: "GeoIP2-City.mmdb",
    },
    trackingParamsEnrichment: {
        includeAffiliateSubID: false,
    },
    apm: {
        options: {
            active: false,
        },
    },
};
