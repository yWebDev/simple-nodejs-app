"use strict";

module.exports = (req, res, next) => {
  res.sendHttpError = (error) => {
    res.status(error.code);
    res.render('error', {
      error
    });
  };

  next();
};