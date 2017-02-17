"use strict";

const express = require('express');
const config = require('config');

const app = express();
app.set('port', config.get('port'));

app.use((req, res, next) => {
  if (req.url === '/') {
    res.send('Index page');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.url === '/hello') {
    res.send('Hello page');
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.send(404, 'Page not found');
});

app.listen(app.get('port'), () => {
  console.log(`Server started at port ${app.get('port')}`);
});