'use strict';

module.exports = {
    _externalConfig: {
        source: {
            doc: 'the source for more data',
            default: 'none',
            format: ['none', 'file', 'dynamo'],
            env: 'EXTERNAL_CONFIG_SOURCE'
        },
        location: {
            doc: 'config file provided by devops',
            default: __dirname + '/../appconf.json',
            env: 'EXTERNAL_CONFIG_LOCATION'
        }
    },
    environment: {
        doc: 'environment name',
        default: 'development',
        env: 'NODE_ENV'
    },
    whitelabel: {
        doc: 'environments whitelabel',
        default: 'ironsource',
        env: 'WHITELABEL'
    },
    etl: {
        version: {
            doc: 'etl version (usually a date formatted YYYYMMDD)',
            default: '20160712',
            env: 'ETL_VERSION'
        }
    },
    log4js: {
        level: {
            default: "INFO",
            format: 'loglevel',
            env: 'LOG_LEVEL'
        },
        jsonLayout: {
            doc: 'lets you toggle json view on and off',
            default: '',
            format: ['', 'json'],
            env: 'JSON_LAYOUT'
        },
        appenders: {
            default: [{type: 'console'}],
            format: Array
        },
        replaceConsole: {
            default: true,
            format: Boolean,
            env: 'LOG_REPLACE_CONSOLE'
        },
        activateTimers: {
            default: true,
            format: Boolean,
            env: 'LOG_ACTIVATE_TIMERS'
        },
        timerLogLevel: {
            default: 'debug',
            format: ['trace', 'debug', 'info'],
            env: 'LOG_TIMERS_LEVEL'
        }
    },
    webserver: {
        port: {
            doc: 'port to bind to',
            default: 3000,
            format: 'port',
            env: 'WEBSERVER_PORT'
        },
        accessLog: {
            doc: 'enable or disable access-logs',
            default: true,
            format: Boolean,
            env: 'ENABLE_ACCESS_LOG'
        },
        trustProxy: {
            doc: 'whether the proxy should be trusted (allows x-forwarded-for to be received)',
            default: true,
            format: Boolean,
            env: 'SET_TRUST_PROXY'
        },
        errorhandler: {
            default: false,
            format: Boolean
        },
        responseTime: {
            doc: 'whether to set a responseTime header on each response',
            default: true,
            format: Boolean
        },
        etag: {
            doc: 'whether to set an etag header on each response',
            default: false,
            format: Boolean
        },
        XPoweredBy: {
            doc: 'whether to set an XPoweredBy header on each response',
            default: false,
            format: Boolean
        },
        pkp: {
            pins: {
                default: [''],
                format: Array
            },
            maxage: {
                default: 300,
                format: Number
            }
        },
        keepAliveTimeout: {
            doc: 'how long sould the server keep connection opens should be less than headersTimeout ',
            default: 1000 * 60 * 2,
            format: Number,
            env: 'WEBSERVER_KEEP_ALIVE_TIMEOUT'
        },
        headersTimeout: {
            doc: 'how long should the server keep connections open, should be higher than keepAliveTimeout',
            default: 1000 * 60 * 2.5,
            format: Number,
            env: 'WEBSERVER_HEADERS_TIMEOUT'
        }
    },
    trackingParamsEnrichment: {
        includeAffiliateSubID: {
            doc: 'affiliate sub id for ironSource static api',
            default: true,
            format: Boolean,
            env: 'AFFILIATE_SUB_ID'
        }
    },
    apm: {
        uri: {
            protocol: {
                doc: "APM server protocol",
                default: "http",
                format: String,
                env: "APM_PROTOCOL"
            },
            hostname: {
                doc: "APM server host",
                default: "apm-server.isappcloud.com",
                format: String,
                env: "APM_HOST"
            },
            port: {
                doc: "APM server port",
                default: 8200,
                format: "port",
                env: "APM_PORT"
            },
        },
        options: {
            serviceName: {
                doc: "APM ServiceName",
                default: "ape",
                format: String,
                env: "APM_SERVICE_NAME"
            },
            active: {
                doc: "whether we can send APM server",
                default: false,
                format: Boolean,
                env: "APM_ENABLED"
            },
            transactionSampleRate: {
                doc: "Adjusting the sampling rate controls what percent of requests are traced",
                default: 0.05,
                format: Number,
                env: "APM_TRANSACTION_SAMPLE_RATE"
            },
            errorOnAbortedRequests: {
                doc: "A boolean specifying if the agent should monitor for aborted TCP connections with un-ended HTTP requests. " +
                    "An error will be generated and sent to the APM Server if this happens.",
                default: true,
                format: Boolean,
                env: "APM_ERROR_ON_ABORTED_REQUESTS"
            },
            transactionMaxSpans: {
                doc:
                    "Specify the maximum number of spans to capture within a request transaction before dropping further spans",
                default: 500,
                format: Number,
                env: "APM_TRANSACTION_MAX_SPANS"
            },
            ignoreUrls: {
                doc: "Used to restrict requests to certain URLs from being sent to APM server",
                default: [],
                format: Array,
                env: "APM_IGNORE_URLS"
            },
            logLevel: {
                doc: "Set the verbosity level for the agent",
                default: "fatal",
                format: String,
                env: "APM_LOG_LEVEL"
            }
        }
    },
    aws: {
        region: {
            doc: 'amazon region',
            format: [
                "us-east-1", "us-west-2", "us-west-1", "eu-west-1", "eu-central-1",
                "ap-southeast-1", "ap-northeast-1", "ap-northeast-2", "ap-southeast-2",
                "sa-east-1", "us-gov-west-1", "cn-north-1"
            ],
            default: "us-west-2",
            env: 'AWS_REGION'
        },
        s3Bucket: {
            doc: 's3 bucket to use as data source',
            default: 'appcloud-bi',
            format: (val) => {
                if (val !== 'appcloud-bi') {
                    throw new Error('bad s3 bucket specified');
                }
            },
            env: 'AWS_BUCKET'
        }
    },
    metrics: {
        enabled: {
            doc: 'whether we can send metrics using statsd',
            default: true,
            format: Boolean,
            env: 'METRICS_ENABLED'
        },
        destinationHost: {
            doc: 'destination host to send metrics using statsd',
            default: '127.0.0.1',
            format: String,
            env: 'METRICS_DESTINATION_HOST'
        }
    },
    caching: {
        enabled: {
            doc: 'whether data models should keep data cached',
            default: true,
            format: Boolean,
            env: 'CACHING_ENABLED'
        }
    },
    cachePurgeDelays: {
        min: {
            doc: 'minimum seconds to wait before purge',
            default: 0,
            format: Number,
            env: 'CACHE_PURGE_DELAYS_MIN'
        },
        max: {
            doc: 'maximum seconds to wait before purge',
            default: 60,
            format: Number,
            env: 'CACHE_PURGE_DELAYS_MAX'
        }
    },
    systemCustomerId: {
        doc: 'system customer id',
        default: 1,
        format: Number,
        env: 'SYSTEM_CUSTOMER_ID'
    },
    cacheExpiration: {
        auth: {
            doc: 'cache expiration for `auth` objects',
            default: 60, // 1 minute
            format: Number,
            env: 'CACHE_EXPIRATION_AUTH',
        },
        refData: {
            doc: 'cache expiration for `refData` objects',
            default: 600, // 10 minutes
            format: Number,
            env: 'CACHE_EXPIRATION_REF'
        },
        config: {
            doc: 'cache expiration for `config` objects',
            default: 900, // 15 minutes
            format: Number,
            env: 'CACHE_EXPIRATION_CONFIG'
        },
        customers: {
            doc: 'cache expiration for `customers` objects',
            default: 900, // 15 minutes
            format: Number,
            env: 'CACHE_EXPIRATION_CUSTOMERS'
        },
        apps: {
            invalidation: {
                doc: 'cache invalidation timeout for `apps` objects',
                default: 1200, // 20 minute
                format: Number,
                env: 'CACHE_INVALIDATION_APPS'
            },
            removal: {
                doc: 'cache removal timeout for `apps` objects',
                default: 1800, // 30 minutes
                format: Number,
                env: 'CACHE_REMOVAL_APPS'
            }
        }
    },
    reporting: {
        request: {
            tbl: {
                doc: 'stream name to report `request` items ',
                default: "appcloud.appcloud.a_requests",
                format: String
            },
            enabled: {
                doc: 'whether reporting for `request` items is enabled ',
                default: false,
                env: 'REPORTING_REQUEST_ENABLED'
            }
        },
        event: {
            tbl: {
                doc: 'stream name to report `event` items ',
                default: "appcloud.appcloud.a_events",
                format: String
            },
            enabled: {
                doc: 'whether reporting for `event` items is enabled ',
                default: false,
                env: 'REPORTING_EVENT_ENABLED'
            }
        }
    },
    requestSettings: {
        maxCount: {
            doc: 'maximum items per feed',
            default: 50,
            format: Number
        },
        defaultCount: {
            doc: 'default items per feed',
            default: 20,
            format: Number
        },
        calculateStaticFilters: {
            doc: 'whether controller should calc static filters',
            default: true,
            format: Boolean
        },
        defLocale: {
            doc: 'default locale code @deprecated/not in use',
            default: 1,
            format: Number
        },
        skipFilters: {
            default: [],
            doc: 'array of filters to skip',
            env: 'REQUEST_SKIP_FILTERS'
        }
    },
    atom: {
        endpoint: {
            default: "https://ib.isappcloud.com/",
            format: 'url'
        },
        auth: {
            doc: 'auth key to be used with atom',
            default: undefined,
            format: '*'
        },
        bulkLen: {
            doc: 'number of reports to accumulate before sending to atom',
            default: 1000,
            format: Number
        },
        flushInterval: {
            doc: 'flush all events after given interval',
            default: 60 * 60 * 2, // 2 minutes
            format: Number
        },
        flushOnExit: {
            doc: 'whether we should flush events on process exit',
            default: true,
            format: Boolean
        },
        retryOptions: {
            retries: {
                doc: 'number of retries to be made to atom before giving up on payload',
                default: 5,
                format: Number
            },
            minTimeout: {
                doc: 'minimum time before each retry',
                default: 1000,
                format: Number
            },
            randomize: {
                doc: 'should randomize the timeout between each retry',
                default: true,
                format: Boolean
            }
        }
    },
    rewriteRules: {
        doc: 'rewrite rules (array of objects)',
        default: [
            {
                match: {subdomain: "cdn", domain: "castplatform", tld: "com"}
                ,
                "rewrite": {subdomain: "cast", domain: "isappcloud"}
            }
        ],
        format: Array,
        env: 'REWRITE_RULES'
    },
    redirection: {
        enabled: {
            doc: 'whether redirection is enabled',
            default: true,
            format: Boolean,
            env: 'REDIRECTION_ENABLED'
        }
    },
    redis: {
        host: {
            doc: 'hostname for redis server',
            default: 'ac-hamsters-dev.rforxq.0001.usw2.cache.amazonaws.com',
            env: 'REDIS_HOST'
        },
        port: {
            doc: 'port for redis server',
            default: 6379,
            format: 'port',
            env: 'REDIS_PORT'
        }
    },
    kafka: {
        host: {
            default: 'kafka-broker.isappcloud.com',
            format: String,
            env: 'EXTERNAL_EVENT_CAPPING_KAFKA_HOST'
        },
        port: {
            default: 9092,
            format: Number,
            env: 'KAFKA_PORT'
        }
    },
    memcache: {
        enabled: {
            default: false,
            format: Boolean
        },
        servers: {
            default: ["127.0.0.1:11211"],
            format: Array
        },
        poolSize: {
            default: 25,
            format: Number
        },
        expiration: {
            default: 900,
            format: Number
        },
        metaPrefix: {
            doc: 'prefix',
            default: "=|==META-DATA==|=",
            format: String
        },
        maxValueSize: {
            doc: 'max value size',
            default: 900000,
            format: Number
        }
    },
    token: {
        default: true,
        format: Boolean
    },
    pubsub: {
        redis: {
            host: {
                doc: 'pubsub redis host',
                format: String,
                env: 'PUBSUB_REDIS_HOST',
                default: 'ac-development.rforxq.0001.usw2.cache.amazonaws.com',
            },
            port: {
                doc: 'pubsub redis port',
                format: 'port',
                env: 'PUBSUB_REDIS_PORT',
                default: 6379
            }
        }
    },
    compression: {
        auth: {
            doc: 'flag that indicates whether data is compressed in source',
            env: 'COMPRESS_AUTH',
            default: false,
            format: Boolean
        },
        config: {
            doc: 'flag that indicates whether data is compressed in source',
            env: 'COMPRESS_CONFIG',
            default: false,
            format: Boolean
        },
        customers: {
            doc: 'flag that indicates whether data is compressed in source',
            env: 'COMPRESS_CUSTOMERS',
            default: false,
            format: Boolean
        },
        ref: {
            doc: 'flag that indicates whether data is compressed in source',
            env: 'COMPRESS_REF',
            default: false,
            format: Boolean
        },
        globalABTest: {
            doc: 'flag that indicates whether data is compressed in source',
            env: 'COMPRESS_GLOBAL_AB_TEST',
            default: false,
            format: Boolean
        }
    },
    geoip: {
        path: {
            default: 'GeoIP2-City.mmdb',
            format: String,
            env: 'GEOIP_PATH'
        },
        watchForUpdates: {
            default: true,
            format: Boolean,
            env: 'GEOIP_WATCH_UPDATES'
        }
    },
    apkSelectionValues: {
        densityLookup: {
            default: {
                "0.75": "ldpi",
                "1": "mdpi",
                "1.5": "hdpi",
                "2": "xhdpi",
                "3": "xxhdpi",
                "4": "xxxhdpi"
            },
            format: Object,
            env: 'DENSITY_LOOKUP'
        },
        defaultDensity: {
            doc: "the default density is xxhdpi",
            default: "3",
            format: String,
            env: 'DEFAULT_DENSITY'
        },
        defaultArchitecture: {
            default: "armeabi-v7a",
            format: String,
            env: 'DEFAULT_ARCHITECTURE'
        }
    },
    featureFlags: {
        url: {
            doc: 'feature flags url',
            default: "https://unleash.isappcloud.com/api/",
            env: 'FEATURE_FLAGS_URL'
        },
        appName: {
            doc: 'feature flags app name',
            default: "ape",
            env: 'FEATURE_FLAGS_APP_NAME'
        },
        customer: {
            doc: 'feature flags customer name',
            default: "ironsource",
            env: 'FEATURE_FLAGS_CUSTOMER'
        },
        disableMetrics: {
            doc: 'feature flags disabled metrics',
            default: false,
            env: 'FEATURE_FLAGS_DISABLE_METRICS'
        }
    },
    reEngagePresentationTime: {
        minutesRange: {
            doc: 'number of minutes to add or remove from the original time',
            default: 60,
            format: Number,
            env: 'REENGAGE_PRESENTATION_MINUTES_RANGE'
        }
    }
};
