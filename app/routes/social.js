// *********************************************************************************
// social.js - this file offers a set of routes for displaying and saving data for all social links to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

// GET route for getting all of the user social links
  app.get("/api/usersocial/:UserId", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findById(req.params.UserId).then(user=>{
       
        user.getSocials().then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      
    });
  });

// =============================================================
// All of the "POST" commands for our API. 

  // POST route for saving a new user social links
  app.post("/api/usersocial", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property.
    var links = req.body.links.split(',');

      for (var i = 0; i < links.length; i++) {
       var x = links[i];

       db.Social.create({
        	link: x,
        	UserId: req.body.UserId
    	}).then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      }
  });
  

// =============================================================

// All of the "DELETE" commands for our API. 

  // DELETE route for deleting users from the useractivities table. We can get the id of the user to be deleted.
  app.delete("/api/usersocial/:UserId", function(req, res) {
    // We just have to specify which user we want to destroy with "where" from the joined 
    // UserActivities table (created dynamically in the user.js file).
       
        db.Social.destroy({
        	where: {
        		UserId: req.params.UserId
        	}
        }).then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
  });

// =============================================================

};