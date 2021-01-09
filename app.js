const express = require('express');
const app = express()
const routes = require('./routes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = 3001;

app.use(routes);

process.on('uncaughtException', function (error) {
  console.log(`general error`, error);
  process.exit(1)
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});