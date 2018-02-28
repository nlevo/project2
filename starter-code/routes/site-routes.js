const express        = require("express");
const siteRoutes     = express.Router();
const passport       = require('passport');
const ensureLogin    = require('connect-ensure-login');
const Business       = require('../models/business');

siteRoutes.get("/", (req, res, next) => {
  res.render("home");
});
 
//ROUTE TO MAP
siteRoutes.get("/map", (req, res, next) => {
  res.render("map");
});

siteRoutes.get("/secret", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render("secret");
  });

siteRoutes.get("/private", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render("private/private");
  });

  siteRoutes.get("/main", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    res.render("private/main");
  });

  //add new business form
  siteRoutes.get("/new", ensureLogin.ensureLoggedIn(), (req, res, next) => {
    
    res.render("private/new", {categories: (Business.schema.path('category').enumValues)}); //categories auto-population
  });

  //add new business form
  siteRoutes.post('/new', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
    console.log(req.body);
    const newBusiness = new Business({
      category: req.body.category,
      name: req.body.name,
      phone: req.body.phone,
      language: req.body.description,
      website: req.body.website,
      // We're assuming a user is logged in here
      // If they aren't, this will throw an error
      _owner: req.user._id,
      hours: {
        mon: {open:  stringTimeToMinutes(req.body.open), close: stringTimeToMinutes(req.body.close), isClosed: req.body.isClosed}
      },
      address: {
        street_num: Number(req.body.street_num),
        street_name: req.body.street_name,
        city: req.body.city,
        state: req.body.state,
        zip: Number(req.body.zip)
      },
    });
  
    newBusiness.save( (err) => {
      if (err) {
        res.send(`<h1>${err}</h1>`);   
      } else {
        res.redirect(`/`);
      }
    });
  });




function stringTimeToMinutes(stringTime){
  let hrs, min, totalInMinutes;
  hrs = Number(stringTime.slice(0, 2));
  min = Number(stringTime.slice(3, 5));
  totalInMinutes = (hrs*60) + min;
  return totalInMinutes;
}
module.exports = siteRoutes;