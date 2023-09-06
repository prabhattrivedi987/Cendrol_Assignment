const express = require("express");

const protected = (req, res, next) => {
  if (!req.session.loginUser) {
    return res.json({
      status:"failed",
      message:"you are not an authenticated person,please login",
    });
  }
  next();
};

module.exports = protected;
