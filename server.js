// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var handleBars = require("express-handlebars");

var fileUploader = require("express-fileupload");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, '/app/public')));


// Static directory
app.use(express.static("./public"));
app.use(fileUploader());

// Routes =============================================================

require("./app/routes/htmlRoutes.js")(app);
require("./app/routes/activities.js")(app);
require("./app/routes/friends.js")(app);
require("./app/routes/user.js")(app);
require("./app/routes/social.js")(app);
require("./app/routes/s3.js")(app);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});