"use strict";

const mongoose = require('libs/dbConnect');
const crypto = require('crypto');
const log = require('libs/log')(module);
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
};

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random() + 'salt';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword
};

const User = mongoose.model('User', userSchema);

module.exports = User;
