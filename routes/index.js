"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('models/User');
const HttpError = require('error/HttpError');
const { ObjectId } = require('libs/dbConnect').Types;

router.get('/user', (req, res, next) => {
  User.find().then((users) => {
    res.json(users)
  }).catch((err) => {
    next(err);
  })
});

router.get('/user/:id', (req, res, next) => {
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

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (user && user.checkPassword(password)) {
      const token = jwt.sign(user, config.get('secret'));

      res.json({ token });
    } else {
      res.sendStatus(403);
    }
  }).catch((err) => {
    next(err);
  });
});

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (user) {
      res.sendStatus(404);
      return;
    }

    const newUser = new User({
      username,
      password
    });

    newUser.save().then(user => {
      const token = jwt.sign(user, config.get('secret'));

      res.status(201).json({ token });
    }).catch((err) => {
      next(err);
    });
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;
