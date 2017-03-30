// *********************************************************************************
// localsrc.js - this file offers a set of routes for local disk images and files
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

   // route to css file referenced in front end
  app.get("/style.css", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/style.css"));
  });

  // route to logo image referenced in front end files
  app.get("/new-lets-logo.png", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/new-lets-logo.png"));
  });

  // Route to the crowd image referenced in style.css
  app.get("/crowd.jpg", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/crowd.jpg"));
  });

  // Route loads final logo referenced in the signup.html
  app.get("/final-logo.jpeg", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/final-logo.jpeg"));
  });

  // route loads the js file referenced in the signup.html
  app.get("/register.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/register.js"));
  });

  // route loads the avatar.jpeg referenced in view.html
  app.get("/avatar.jpeg", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/avatar.jpeg"));
  });

};
