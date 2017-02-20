"use strict";

const express = require('express');
const engine = require('ejs-locals');
const path = require('path');
const config = require('config');
const log = require('libs/log')(module);
const db = require('db/connect');
const app = express();

app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());

if (app.get('env') === 'development') {
  app.use(express.logger('debug'));
} else {
  app.use(express.logger('default'));
}

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Node App'
  })
});

app.use((err, req, res, next) => {
  if (app.get('env') === 'development') {
    const errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});

app.listen(config.get('port'), () => {
  log.info(`Server started at port ${config.get('port')}`);
});