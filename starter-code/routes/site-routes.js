const express        = require("express");
const siteRoutes     = express.Router();
const passport       = require('passport');
const ensureLogin    = require('connect-ensure-login');
const Business       = require('../models/business');
var geocoder         = require('geocoder');

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

    //geocoding address to longitude and langitude
    geocoder.geocode(req.body.full_address, function(err, data) {
      if(err || data.results[0] === "undefined"){console.log("Error: " + err); return}
    let x = Object.values(data.results[0].geometry.location);
    let location = {
      type: 'Point',
      coordinates: [x[0], x[1]]
    };
      //create new business object
      const newBusiness = new Business({
        category: req.body.category,
        name: req.body.name,
        phone: req.body.phone,
        description: req.body.description,
        language: req.body.language,
        website: req.body.website,
        loc: location,
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
      console.log(newBusiness);
      newBusiness.save( (err) => {
        if (err) {
          res.send(`<h1>${err}</h1>`);   
        } else {
          res.redirect(`/`);
        }
      });
    });
  });

  //
  siteRoutes.get('/list', (req, res, next) => {
    // New
    Business.find({},function(err,data){
      if (err){
          res.render("error", {message: err})
      } 
      res.render("list", { businesses: data });
    });  
  });

   //
   siteRoutes.get('/business/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
    // New
    let businessId = req.params.id;

    Business.findById( businessId, function(err,data){
      if (err){
          res.render("error", {message: err})
      } 
      res.render("private/edit", { business: data });
    });  
  });

  siteRoutes.post('/business/:id/edit', ensureLogin.ensureLoggedIn('/login'),(req, res, next) => {
    // New
    const updatedBusiness = new Business({
      category: req.body.category,
      name: req.body.name,
      phone: req.body.phone,
      description: req.body.description,
      language: req.body.language,
      website: req.body.website,
    });

    Business.findByIdAndUpdate(req.params.id, updatedBusiness, function(err,data){
      if (err){
          res.render("error", {message: err})
      } 
      res.redirect("/list");
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


// var geocoder;
// function addressToGeocode(address){
//   geocoder = new google.maps.Geocoder();
//   let geocodeResult;
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//       geocodeResult = results;
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
//   return geocodeResult;
// }