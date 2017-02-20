"use strict";

module.exports = (err, req, res, next) => {
  res.sendHttpError = (error) => {
    res.status(error.code);
    res.render('error', {
      error
    });
  };

  next();
};