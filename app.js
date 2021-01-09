const express = require('express');
const config = require('config');
const app = express()
const routes = require('./routes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const logging = require('./utils/logging');
const appLogger = logging.getLogger('app');

const PORT = config.webserver.port;

app.use(routes);

process.on('uncaughtException', function (error) {
  appLogger.error(`general error`, error);
  process.exit(1)
});

app.listen(PORT, function () {
  appLogger.info(`App listening on port ${PORT}!`);
});