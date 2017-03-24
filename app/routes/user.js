// *********************************************************************************
// user.js - this file offers a set of routes for displaying and saving data for all user information to the db
// *********************************************************************************

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the user
  app.get("/api/user", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({
      where: {
        UserId: req.body.user
      }
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
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      availability: req.body.availability
      // photo: 
    }).then(function(user) {
      // We have access to the new user as an argument inside of the callback function
      res.json(user);
    });
  });

  // PUT route for updating user information. We can get the updated user data from req.body
  app.put("/api/user", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update({
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      availability: req.body.availability
      // photo: 
    }, {
      where: {
        UserId: req.body.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

};
