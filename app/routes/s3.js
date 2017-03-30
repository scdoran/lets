// exported routes
module.exports = function(app) {
	app.get("/", function(req, res) {

	});
	// post image
	app.post("/newUpload/image", function(req, res) {
		console.log("Received photo upload request");

		console.log("req.files gives " + req.files);
		// Load the SDK for JavaScript
		var AWS = require('aws-sdk');

		// Load credentials and set region from JSON file
		AWS.config.loadFromPath('./amazonConfig.json');

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

	    // var fileStream = fs.createReadStream(file);
	    // fileStream.on('error', function(err) {
	    // 	console.log('File Error', err);
	    // });
	    uploadParams.Body = file.data;

	    
	    var rename = function() {
	    	var splitName = file.name.split(".");
	    	console.log(splitName);
	    	var typeLoc = splitName.length - 1;
	    	console.log(typeLoc);
	    	var fileType = file.name[typeLoc];
	    	console.log(fileType);
	    	uploadParams.Key = "Uid" + "." + fileType;
	    };

	    rename();

	    // call S3 to retrieve upload file to specified bucket
	    s3.upload (uploadParams, function (err, data) {
	    	if (err) {
	    		console.log("Error", err);
	    		res.json("");
	    	} if (data) {
	    		console.log("Upload Success", data.Location);
	  			res.json(data.Location);
	    	}
	    }); 
	});
};