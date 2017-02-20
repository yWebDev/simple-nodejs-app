"use strict";

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', (err, db) => {
  if (err) throw err;

  console.log('DB: Successfully connected to db');
});

module.exports = mongoose;
