"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');
const logger = require('morgan');
const path = require('path');
const config = require('config');
const log = require('libs/log')(module);
const loggerFormat = require('libs/loggerFormat');
const HttpError = require('error/HttpError');
const db = require('libs/dbConnect');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();


if (app.get('env') === 'development') {
  app.use(logger('dev', loggerFormat));
} else {
  app.use(serveFavicon(path.join(__dirname, 'public/dist/favicon.ico')));
  app.use(logger('default'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({ mongooseConnection: db.connection }),
  resave: true,
  saveUninitialized: true
}));
app.use(serveStatic(path.join(__dirname, 'public/dist')));
app.use((err, req, res, next) => {
  if (app.get('env') === 'development') {
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});
app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, 'public/dist/index.html'))
});
app.use('/api', require('routes'));

app.listen(config.get('port'), () => {
  log.info(`Server started at port ${config.get('port')}`);
});