"use strict";

const express = require('express');
const engine = require('ejs-locals');
const path = require('path');
const config = require('config');
const log = require('libs/log')(module);
const loggerFormat = require('libs/loggerFormat');
const HttpError = require('error/HttpError');
const app = express();

app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());

if (app.get('env') === 'development') {
  app.use(express.logger('dev', loggerFormat));
} else {
  app.use(express.logger('default'));
}

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('middlewares/sendHttpError'));
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.sendHttpError(err);
    return;
  }

  if (app.get('env') === 'development') {
    const errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});

require('routes')(app);

app.listen(config.get('port'), () => {
  log.info(`Server started at port ${config.get('port')}`);
});