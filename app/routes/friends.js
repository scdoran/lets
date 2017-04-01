// *********************************************************************************
// friends.js - this file offers a set of routes for displaying and saving data for all friend information to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the friends
  app.get("/api/friends", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findById(req.session.user.id).then(user=>{
       
        user.getFriend().then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });
      
    });
  });

  // POST route for saving a new friends
  app.post("/api/friends/:FriendId", function(req, res) {
    
    var friendIds = req.params.FriendId;
    
    db.User.findById(req.session.user.id).then(user=>{
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
  app.delete("/api/friends/:FriendId", function(req, res) {
    // We just have to specify which user we want to destroy with "where" from the joined 
    // UserFriends table (created dynamically in the user.js file).
    db.User.findById(req.session.user.id).then(user=>{
       
        user.removeFriend(req.params.FriendId).then(function(user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });

    });
  });

};


