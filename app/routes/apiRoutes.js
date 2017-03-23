// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/activity", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Activity.findAll({}).then(function(activity) {
      // We have access to the todos as an argument inside of the callback function
      res.json(activity);
    });
  });

  // POST route for saving a new todo
  app.post("/api/activity", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Activity.create({
      type: req.body.type,
      location: req.body.location
    }).then(function(activity) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(activity);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/activity/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Activity.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(activity) {
      res.json(activity);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/activity", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Activity.update({
      type: req.body.type,
      location: req.body.location
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(activity) {
      res.json(activity);
    });
  });

};
