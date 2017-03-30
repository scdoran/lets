// *********************************************************************************
// user.js - this file offers a set of routes for displaying and saving data for all user information to the db
// *********************************************************************************

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the users
  app.get("/api/user", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({
      // where: {
      //   UserId: req.body.user
        // or availabitity: true?
      // }
    }).then(function(user) {
      // We have access to the user as an argument inside of the callback function
      res.json(user);
    });
  });

   // POST route for saving a new user
  app.post("/api/user", function(req, res) {
  	console.log(req.body.name);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      status: req.body.status,
      availability: req.body.availability,
      latitude: req.body.latitude,
      longitude: req.body.longitude
      // photo: 
    }).then(function(user) {
      // We have access to the new user as an argument inside of the callback function
      res.json(user);
    });
  });

  // PUT route for updating user information. We can get the updated user data from req.body
  app.put("/api/:UserId", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      status: req.body.status,
      availability: req.body.availability,
      latitude: req.body.latitude,
      longitude: req.body.longitude
      // photo: 
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  // PUT route for updating user information. We can get the updated user data from req.body
  app.put("/view", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    console.log("updating to " + req.body.availability);

    db.User.update({
      availability: req.body.availability
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

};
