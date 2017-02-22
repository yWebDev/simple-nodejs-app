"use strict";

const express = require('express');
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
  res.json({
    username: req.body.username,
    password: req.body.password,
  });
});

module.exports = router;
