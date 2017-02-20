"use strict";

const User = require('models/User');
const HttpError = require('error/HttpError');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Node App'
    })
  });

  app.get('/user', (req, res, next) => {
    User.find().then((users) => {
      res.json(users)
    }).catch((err) => {
      next(err);
    })
  });

  app.get('/user/:id', (req, res, next) => {
    User.findById(req.params.id).then((user) => {
      if (!user) {
        next(new HttpError(404, 'User not found'));
        return;
      }
      res.json(user)
    }).catch((err) => {
      next(err);
    })
  });
};