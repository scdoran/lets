// *********************************************************************************
// user.js - this file offers a set of routes for displaying and saving data for all user information to the db
// *********************************************************************************

// Requiring our models
var db = require("../models");
////////////////////
// Authentication //
////////////////////
// crypto package dependancy
var crypto = require('crypto');
// function that creates salt; salts are secret codes used to decrypt a password 
// a specific way when passed through a hash function. speaking of...
var createSalt = function(length) {
  return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};
// hash function, scrambles password using a given salt. returns the value to 
// a variable that calls the function
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};


// Routes
// =============================================================
module.exports = function(app) {

	 // GET route for getting all of the users
  app.post("/api/login", function(req, res) {
    // findAll returns all entries for a table when used with no options
    console.log("login called " + req.body + " " + req.body.email )
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      // We have access to the user as an argument inside of the callback function
      // runs given password through hash using the salt associated
      // with the given username
      var checkUserEncryption = sha512(req.body.password, user.salt);
      // if the resulting hashed password is the same as the stored 
      // password, then success!
      if (checkUserEncryption === user.encryptedpw) {
        console.log("Log in successful!");
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
        res.json({valid:true});
        //res.redirect("/view");
      // else failure
      } else {
        console.log("Incorrect password");
        res.json({valid:false});
        //res.redirect("/");
      };
    });
  });

  // GET route for getting all of the users
  app.get("/api/user", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({
      // where: {
      //   availability: true
      // }
    }).then(function(user) {
      // We have access to the user as an argument inside of the callback function
      res.json("test", user);
    });
  });

   // POST route for saving a new user
  app.post("/api/user", function(req, res) {
    var password = req.body.password;
    // creating random salt with 32 character string
    var newSalt = createSalt(32);
    // run desired password through hash with newly 
    // created salt to get encrypted password
    var newUserEncryption = sha512(password, newSalt);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      status: req.body.status,
      availability: req.body.availability,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      status: req.body.status,
      salt: newSalt,
      encryptedpw: newUserEncryption 
    }).then(function(user) {
      // sets a cookie with the user's info
      // req.user = user;
      // delete req.user.encryptedpw; // delete the password from the session
      console.log("user added");
      req.session.user = user;  //refresh the session value
      res.locals.user = user;
      //req.session.user = user;
      // We have access to the new user as an argument inside of the callback function
      res.json(user);
    });
  });

  // PUT route for updating user information. We can get the updated user data from req.body
  app.put("/api/:UserId", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      status: req.body.status,
      availability: req.body.availability,
      latitude: req.body.latitude,
      longitude: req.body.longitude
      // photo: 
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  // // PUT route for updating user information. We can get the updated user data from req.body
  // app.put("/view", function(req, res) {
  //   // Update takes in an object describing the properties we want to update, and
  //   // we use where to describe which objects we want to update
  //   console.log("updating to " + req.body.availability);
  //   console.log("longitude: " + req.body.longitude);
  //   console.log("latitude: " + req.body.longitude);

  //   db.User.update({
  //     availability: req.body.availability,
  //     longitude: req.body.longitude,
  //     latitude: req.body.latitude
  //   // }, {
  //   //   where: {
  //   //     id: req.params.id
  //   //   }
  //   }).then(function(user) {
  //     res.json(user);
  //   });
  // });

  // PUT route for updating user information. We can get the updated user data from req.body
  app.put("/view", function(req, res) {
    var dataToSave = req.body;
    dataToSave.id = dataToSave.id || 0;

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    console.log("updating to " + dataToSave.availability);
    console.log("longitude: " + dataToSave.longitude);
    console.log("latitude: " + dataToSave.latitude);

    db.User.update({
      availability: dataToSave.availability,
      longitude: dataToSave.longitude,
      latitude: dataToSave.latitude
    }, {
      where: {
        id: dataToSave.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

};
