// *********************************************************************************
// friends.js - this file offers a set of routes for displaying and saving data for all friend information to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the friends
  app.get("/api/friends/:UserId", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findById(req.params.UserId).then(user=>{
       
        user.getFriend().then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      
    });
  });

  // POST route for saving a new friends
  app.post("/api/friends", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    var friendIds = req.body.FriendIds;
    db.User.findById(req.body.UserId).then(user=>{
      for (var i = 0; i < friendIds.length; i++) {
       var x = friendIds[i];
       // Expecting an array of FriendIds..[1,2].
        user.addFriend(x).then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      }
    });
  });

  // DELETE route for deleting users from the friends table. We can get the id of the user to be deleted.
  app.delete("/api/friends/:UserId", function(req, res) {
    // We just have to specify which user we want to destroy with "where" from the joined 
    // UserFriends table (created dynamically in the user.js file).
  
    var friendId = req.body.ActivityId;

    db.User.findById(req.body.UserId).then(user=>{
       
        user.removeFriend().then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });

    });
  });

};


