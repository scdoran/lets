////////////////////
// Authentication //
////////////////////

// crypto package dependancy
var crypto = require('crypto');
// client-sessions dependency for cookie storage
var session = require('client-sessions');
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

////////////////////
//    Database    //
////////////////////



app.post('/login', function(req, res) {
  db.User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
    	res.render('/signup');
    } else {
    	//
    	var checkUserEncryption = sha512(req.body.password, user.salt);
    	if (checkUserEncryption === user.encryptedPass) {
    			// Randomizes a token for user
    			var userToken = createSalt(12);
    			// cookie creation
					app.use(session({
					  cookieName: 'session',
					  // high-entropy string for user confirmation
					  secret: userToken,
					  // length of time cookie is valid
					  duration: 30 * 60 * 1000,
					  // extend duration if user is actively using site
					  activeDuration: 5 * 60 * 1000,
					  // prevents browser scripts from manipulating cookie
					  httpOnly: true,
					  // cookies are https only
					  secure: true,
					  // cookie deletes itself upon browser close
					  ephemeral: true
					}));
	      	// sets a cookie with the user's info
	      	req.session.user = user;
	      	res.redirect('/view');
    	} else {
      		res.redirect('/signup');
    	}
    }
  });
});

app.get('/logout', function(req, res) {
	// should remove info from cookie
  req.session.reset();
  res.redirect('/');
});












































































// // cli arguments for testing and clarity
// var action = process.argv[2];
// var uid = process.argv[3];
// var password = process.argv[4];
// // switch cases looking for desired action
// switch (action) {
// 	// registering a new user (adding to db)
// 	// TODO: make sure user doesn't already exist
// 	case "register":
// 		// creating random salt with 32 character string
// 		var salt = createSalt(32);
// 		// run desired password through hash with newly 
// 		// created salt to get encrypted password
// 		var newUserEncryption = sha512(password, salt);
// 		// insert new user info into db
// 		connection.query("INSERT INTO logins SET ?", 
// 			{
// 				username: uid,
// 				encryptedPass: newUserEncryption,
// 				salt: salt
// 			},
// 			function(err) {
// 				if (err) throw err;
// 				console.log("~~~~~~~~~" + "\nRegistration successful!" + "\n~~~~~~~~~");
// 				connection.end();
// 			});
// 		break;
// 	// attempting login
// 	// TODO: handle non-existing user without throwing error
// 	// TODO: Store login through cookies? Session storage to maintain login status
// 	case "login":
// 		// find user in table
// 		connection.query("SELECT * FROM logins WHERE username=?", [uid], function(err, res) {
// 			if (err) throw err;
// 			// runs given password through hash using the salt associated
// 			// with the given username
// 			var checkUserEncryption = sha512(password, res[0].salt);
// 			// if the resulting hashed password is the same as the stored 
// 			// password, then success!
// 			if (checkUserEncryption === res[0].encryptedPass) {
// 				console.log("Log in successful!");
// 				connection.end();
// 			// else failure
// 			} else {
// 				console.log("Incorrect password");
// 				connection.end();
// 			};
// 		})
// 		break;
// 	// if anything other than registration or login is attempted
// 	default: 
// 		console.log("Invalid request.");
// };



// //////////