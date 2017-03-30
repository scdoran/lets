// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

//Require login function to be used in routing
function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/signup');
  } else {
    next();
  }
};

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
  app.get("/profile", requireLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  // Route loads signup.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Route loads view.html
  app.get("/view", requireLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

};
