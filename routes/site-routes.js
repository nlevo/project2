const express = require("express");
const siteRoutes = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const Business = require('../models/business');
var geocoder = require('geocoder');



//ROUTE DISPLAY NEW BUSINESS FORM
siteRoutes.get("/new", ensureLogin.ensureLoggedIn(), (req, res, next) => {

  res.render("private/new", {
    categories: (Business.schema.path('category').enumValues), //categories auto-population
    languages: (Business.schema.path('language').enumValues)
  }); //language auto-population
});

//ROUTE POST ADD NEW BUSINESS
siteRoutes.post('/new', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  //geocoding address to longitude and langitude
  geocoder.geocode(req.body.full_address, function (err, data) {
    if (err || data.results === "undefined") {
      console.log("Error: " + err); res.render('error');
      return;
    }
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
        mon: { open: req.body.open, close: req.body.close, isClosed: req.body.isClosed }
      },
      address: {
        street_num: Number(req.body.street_num),
        street_name: req.body.street_name,
        city: req.body.city,
        state: req.body.state,
        zip: Number(req.body.zip)
      },
    });

    newBusiness.save((err) => {
      if (err) {
        res.send(`<h1>${err}</h1>`);
      } else {
        res.redirect(`/list`);
      }
    });
  });
});

//ROUTE GENERATE LIST OF BUSINESSES
siteRoutes.get('/list', (req, res, next) => {


  Business.find({}, function (err, data) {
    if (err) {
      res.render("error", { message: err })
    }
    let userID;
    if (req.user) { userID = req.user._id; }
    else { userID = 0; }
    res.render("list", { businesses: data, userId: userID });
  });
});

//GET UPDATE FORM
siteRoutes.get('/business/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  // New
  let businessId = req.params.id;

  Business.findById(businessId, function (err, data) {
    if (err) {
      res.render("error", { message: err })
    }
    res.render("private/edit2", {
      business: data,
      categories: (Business.schema.path('category').enumValues), //categories auto-population
      languages: (Business.schema.path('language').enumValues)
    }  //languages auto-population
    );
  });
});

//ROUTE - DELETE BUSINESS
siteRoutes.get('/business/:id/delete', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Business.findOneAndRemove(id, function (err, data) {
    if (err) {
      res.render("error", { message: err })
    }
    res.redirect("/list");
  });
});

//POST UPDATE FORM
siteRoutes.post('/business/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  // New
  const updatedBusiness = {
    category: req.body.category,
    name: req.body.name,
    phone: req.body.phone,
    description: req.body.description,
    language: req.body.language,
    website: req.body.website,
  };

  Business.findByIdAndUpdate(req.params.id, updatedBusiness, function (err, data) {
    if (err) {
      res.render("error", { message: err })
    }
    res.redirect("/list");
  });
});

//POST - SEARCH BUSINESS
// siteRoutes.post('/search',(req, res, next) => {

//   Business.find( {category: req.body.category, language: req.body.language}, function(err,data){
//     if (err){
//         res.render("error", {message: err})
//     } 
//     res.render("map-search", { business: data, 
//       categories: (Business.schema.path('category').enumValues), //categories auto-population
//       languages: (Business.schema.path('language').enumValues)});
//   });  
// });

//new databse route
siteRoutes.post('/search2', (req, res, next) => {

  Business.find({ category: req.body.category, language: req.body.language }, function (err, data) {
    if (err) {
      res.render("error", { message: err })
    }
    console.log("Businesses are:");
    console.log(data);
    res.json(data);
  });
})

//ROUTE TO MAP
siteRoutes.get("/", (req, res, next) => {
  res.render("map", {
    categories: Business.schema.path('category').enumValues, //categories auto-population
    languages: Business.schema.path('language').enumValues
  });
});

// siteRoutes.post('/search2', (req, res, next) => {
//   console.log("Category: " + req.category);
//   console.log("Lnguage: " + req.language);
//   Business.find((err, buissnesses) => {
//     res.json(buissnesses);
//   })
// })  



function stringTimeToMinutes(stringTime) {
  let hrs, min, totalInMinutes;
  hrs = Number(stringTime.slice(0, 2));
  min = Number(stringTime.slice(3, 5));
  totalInMinutes = (hrs * 60) + min;
  return totalInMinutes;
}
module.exports = siteRoutes;


