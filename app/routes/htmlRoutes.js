// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

   // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // login route loads login.html
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Route to the profile page
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

    // Route to the view page
  app.get("/view", function(req, res) {
    db.User.findAll({
      where: {
        availability: true
      }
    }).then(function(data){
      res.render("view", {user: data});
    });
    
    // function userActivity(filter){
    //   db.User.findAll({
    //   where: {
    //     availability: true
    //   }
    // }).then(function(data){
    //   res.render("test", {user: data});
    // });
    // };

  });

  // Route loads signup.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

};
