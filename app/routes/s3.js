var db = require("../models");

// exported routes
module.exports = function(app) {
	app.get("/", function(req, res) {

	});
	// post image
	app.post("/newUpload/image", function(req, res) {
		console.log("Received photo upload request");

		console.log("req.files gives " + req.files.photo);
		// Load the SDK for JavaScript
		var AWS = require('aws-sdk');

		// Load credentials and set region from JSON file
		AWS.config.loadFromPath('./app/config/amazonConfig.json');

		// Create S3 service object
		s3 = new AWS.S3({
			apiVersion: '2006-03-01',
			endpoint: 's3.amazonaws.com',
		    signatureVersion: 'v4',
		    region: 'us-east-1'
		});                    

	
	    // call S3 to retrieve upload file to specified bucket
	    var uploadParams = {Bucket: 'bucket-for-lets', Key: '', Body: ''};
	    var file = req.files.photo;
	   
	    uploadParams.Body = file.data;

	    
	    var rename = function() {
	    	var splitName = file.name.split(".");
	    	console.log(splitName);
	    	var typeLoc = splitName.length - 1;
	    	console.log(typeLoc);
	    	var fileType = splitName[typeLoc];
	    	console.log(fileType);
	    	uploadParams.Key = req.body.UserId + "." + fileType;
	    };

	    rename();

	    // call S3 to retrieve upload file to specified bucket
	    s3.upload (uploadParams, function (err, data) {
	    	if (err) {
	    		console.log("Error", err);
	    		res.json("");
	    	} if (data) {
	    		console.log("Upload Success", data.Location);
	  			db.User.update({
			      photo: data.Location
			    }, {
			      where: {
			        id: req.body.UserId
			      }
			    }).then(function(user) {
			      res.json(data.Location);
			    });

	    	}
	    }); 
	});
};