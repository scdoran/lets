// *********************************************************************************
// activities.js - this file offers a set of routes for displaying and saving data for all activities to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

// All of the "GET" commands for our API

  // GET route for getting all of the activities
  app.get("/api/activities", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Activity.findAll({}).then(function(user) {
      // We have access to the activities as an argument inside of the callback function
      res.json(user);
    });
  });

  // GET route for getting all of the useractivities
  app.get("/api/useractivities/:UserId", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findById(req.params.UserId).then(user=>{
       
        user.getActivities().then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      
    });
  });

// =============================================================
// All of the "POST" commands for our API. 

  // POST route for saving a new useractivities
  app.post("/api/useractivities", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property.
    var activityIds = req.body.ActivityId;

    db.User.findById(req.body.UserId).then(user=>{
      for (var i = 0; i < activityIds.length; i++) {
       
        user.addActivity([activityIds[i]]).then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      }
    });
  });
// =============================================================

// All of the "DELETE" commands for our API. 

  // DELETE route for deleting users from the useractivities table. We can get the id of the user to be deleted.
  app.delete("/api/useractivities/:UserId/:ActivityId", function(req, res) {
    // We just have to specify which user we want to destroy with "where" from the joined 
    // UserActivities table (created dynamically in the user.js file).
    db.User.findById(req.params.UserId).then(user=>{
        user.removeActivities(req.params.ActivityId).then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
    });
  });

// =============================================================

};
