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
    db.UserFriends.findAll({
      where: {
        UserId: req.body.UserId
      }
    }).then(function(user) {
      // We have access to the friends as an argument inside of the callback function
      res.json(user);
    });
  });

  // POST route for saving a new friends
  app.post("/api/friends", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.UserFriends.create({
      UserId: req.body.UserId,
      FriendId: req.body.FriendId
    }).then(function(user) {
      // We have access to the new user as an argument inside of the callback function
      res.json(user);
    });
  });

  // DELETE route for deleting users from the friends table. We can get the id of the user to be deleted.
  app.delete("/api/friends", function(req, res) {
    // We just have to specify which user we want to destroy with "where" from the joined 
    // UserFriends table (created dynamically in the user.js file).
    db.UserFriends.destroy({
      where: {
        UserId: req.params.id,
        FriendId: req.params.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

};


