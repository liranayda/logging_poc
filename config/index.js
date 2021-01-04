'use strict';

const Config = require('backend-kit').Config;
const path = require('path');

const config = Config.getConfig(path.resolve(__dirname), 'schema');
module.exports = config;
