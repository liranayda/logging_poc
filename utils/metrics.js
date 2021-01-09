const Metrics = require('backend-kit').Metrics;
const config = require('config');

const metrics = new Metrics({
    enabled: config.enableMetrics,
    environment_type: 'ironsource',
    environment: 'development',
    version: '1.25',
    host: config.metricsHost
});
module.exports = metrics;