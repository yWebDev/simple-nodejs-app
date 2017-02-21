"use strict";

const User = require('models/User');
const HttpError = require('error/HttpError');
const ObjectId = require('libs/dbConnect').Types.ObjectId;

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
    let id;
    try {
      id = ObjectId(req.params.id);
    } catch (err) {
      next(new HttpError(404, 'User not found'));
      return;
    }

    User.findById(id).then((user) => {
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