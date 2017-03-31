// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/index');
  } else {
    next();
  }
};

function ifLoggedIn (req, res, next) {
  console.log("ifLoggedIn fired");
  if (req.session.user) {
    console.log("ifLoggedIn found user");
    res.redirect('/view');
  } else {
    console.log("ifLoggedIn did not find user");
    next();
  }
};

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
   // index route loads index.html
  app.get("/", ifLoggedIn, function(req, res) {
    console.log("homepage called");
    res.redirect("/index");
  });


   // index route loads index.html
  app.get("/index", ifLoggedIn, function(req, res) {
    console.log("index called");
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // logout route resets cookie and redirects to home page
  app.get('/logout', function(req, res) {
    console.log("logout called");
    req.session.reset();
    res.redirect('/view');
  });

  // Route to the profile page
  app.get("/profile", requireLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

    // Route to the view page
  app.get("/view", requireLogin, function(req, res) {
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

    // Route to the profile page
  app.get("/proflie/:id", function(req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(data){
      res.render("profile", {user: data});
    });
  });


  // Route loads signup.html
  app.get("/signup", ifLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

};
