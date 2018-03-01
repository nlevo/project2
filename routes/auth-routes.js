const express        = require("express");
const authRoutes     = express.Router();
const User           = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const passport       = require('passport');

//encryption
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
//encryption ends

//ROUTE - RENDER SIGNUP FORM
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//ROUTE - POST SIGNUP

authRoutes.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

authRoutes.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login');
});

authRoutes.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

authRoutes.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = authRoutes;