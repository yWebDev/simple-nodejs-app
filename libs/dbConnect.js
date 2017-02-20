"use strict";

const mongoose = require('mongoose');
const config = require('config');
const log = require('libs/log')(module);

mongoose.connect(config.get('mongoose:uri'));
mongoose.Promise = global.Promise;

const open = () => (
  new Promise((resolve) => {
    mongoose.connection.on('open', resolve);
  })
);

const dropDB = () => (
  new Promise((resolve) => {
    mongoose.connection.dropDatabase(resolve);
  })
);

const requireModels = () => {
  require('models/User');

  const models = Object.keys(mongoose.models).map((key) => (
    mongoose.models[key].ensureIndexes()
  ));

  return Promise.all(models)
};

const createUsers = () => {
  const users = [
    { username: 'test1', password: '12345', salt: '11' },
    { username: 'test2', password: '12345', salt: '11' },
    { username: 'admin', password: 'admin', salt: '11' }
  ];

  return Promise.all(users.map(userData => {
    const user = new mongoose.models.User(userData);

    return user.save();
  }))
};

[
  open,
  dropDB,
  requireModels,
  createUsers
].reduce((prev, next) => (
  prev.then(next)
), Promise.resolve())
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    log.error(err.toString());
    mongoose.disconnect();
  });

module.exports = mongoose;
