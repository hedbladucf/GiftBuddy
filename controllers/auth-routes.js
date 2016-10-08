// ===============================================================================
// LOAD DEPENDENCY
// We are primarily interested in the user data and the jwt dependency for coding/decoding
// ===============================================================================

var express = require("express");
var mo = require("method-override");
var bp = require("body-parser");
var path = require("path");

var GB = require("../models/giftbuddy.js");

// bring in our Cookies library, so we can send the user the web token
var Cookies     = require('cookies');
// JWT used to create, sign, and verify auth tokens
var jwt         = require('jsonwebtoken'); 


module.exports = function(app){
	// API POST Requests
	// The code in here authenticates against the user data. 
	// If a user exists in the user list they are given an access "token"
	// Otherwise, they are denied access to the api route
	// ---------------------------------------------------------------------------

    //After entering user name and password and clicking submit, they are brought to this route
	app.post('/auth', function(req, res){
        console.log("Authorizing");

		var userEmail = req.body.email;
		var userPass = req.body.password;

        var userInfo = {
            username: userEmail,
            password: userPass
        };

            //Match email and password and redirect home with good cookie
            GB.verifyCredentials('users', userEmail, userPass, function(data){
                var numUsersFound = data[0].usersFound;

                // console.log(data);
                console.log(numUsersFound + " user found");

                //If the email and pass match
                if (numUsersFound == 1){

                    //Find the new user's id in the database based on the email they signed up with
                    GB.findUserID('users', userEmail, function(data){

                        console.log(data);
                        var userID = data[0].u_id;

                        // We use jwt to "sign" a web token, using the secret we created in server.js
                        var token = jwt.sign(userInfo, app.get('jwtSecret'), {
                            expiresIn: 1440 // Token is given but will expire in 24 minutes (requiring a re-login)
                        });

                        // We need to send this to our user with a cookie.
                        // Whenever they try to visit a part of the site usually closed off,
                        // our server will grab this cookie to ensure that s/he ha clearence.

                        // The Cookie will be named 'access_token'.
                        new Cookies(req, res).set(userID+"--token", token, {
                            httpOnly: true,
                            secure: false,
                            });

                        console.log("Cookie Sent");

                        //redirect home
                        res.redirect('/home');
                    });
                }
                //If they dont match we tell the client that the password didn't match the username given
                else{
                    console.log("Wrong password!");
                    res.redirect("/");
                }

            });

	});


    //When a user signs up, they are verified and redirected to /home with good cookie
    app.post('/user/create', function(req, res){

        var fullName = req.body.firstName + " " + req.body.lastName;
        var newEmail = req.body.email;
        var newPass = req.body.password;

        var userInfo = {
            username: newEmail,
            password: newPass
        };

        //Create the user and then verify them
        GB.createUser('users', fullName, newEmail, newPass, function(data){

            //Match email and password and redirect home with good cookie
            GB.verifyCredentials('users', newEmail, newPass, function(data){
                var numUsersFound = data[0].usersFound;

                // console.log(data);
                console.log(numUsersFound + " users found");

                //If the email and pass match
                if (numUsersFound == 1){

                    //Find the new user's id in the database based on the email they signed up with
                    GB.findUserID('users', newEmail, function(data){

                        console.log(data);
                        var userID = data[0].u_id;

                        // We use jwt to "sign" a web token, using the secret we created in server.js
                        var token = jwt.sign(userInfo, app.get('jwtSecret'), {
                            expiresIn: 1440 // Token is given but will expire in 24 minutes (requiring a re-login)
                        })

                        // We need to send this to our user with a cookie.
                        // Whenever they try to visit a part of the site usually closed off,
                        // our server will grab this cookie to ensure that s/he ha clearence.

                        // The Cookie will be named 'access_token'.
                        new Cookies(req, res).set(userID+"--token", token, {
                            httpOnly: true,
                            secure: false,
                            });

                        console.log("Cookie Sent");

                        //redirect home
                        res.redirect('/home');
                    });
                }
                //If they dont match we tell the client that the password didn't match the username given
                else{
                    console.log("Wrong password!");
                    res.redirect("/");
                }

            });



        });
    });



    // ------------------------------------------------------------------------------------------------------
    // GET/POST - This route checks token for all subsequent queries (in our case all the api queries)
    // ------------------------------------------------------------------------------------------------------
    // By saying app.all (all routes will pass through here. If they meet the requirement for a token then they are "next"ed to the next route option).


    // IMPORTANT #3
    // ============
    // app.all('*'): every entry into the site that proceeds this route file
    // (essentially, api-routes.js )
    app.all('*', function(req, res, next) {

        var cookieToken = req.headers.cookie;
        var cookieArray = cookieToken.split("--");
        var userID = cookieArray[0];

        // IMPORTANT #4
        // ============

        // We define a token variable and grab the cookie from our user.
        // Remember, we named it "access_token", and that's what we ".get" from our user
        var token = new Cookies(req, res).get(userID+"--token");

        // log the token so we can view it in the console
        // (don't do this on a real app, this log is for demo purposes)
        // console.log("Token: " + token);


        // IMPORTANT #5
        // ============
        // Now that we grabbed the token from our cookie,
        // we can pass it to jwt, which check that it matches our site's

        // jwtSecret (set in server.js)
        jwt.verify(token, app.get('jwtSecret'), function(err, decoded) {
            if (err) {
                // if it's a bad cookie, tell console (debugging)
                console.log("bad cookie");
                // return error if there is one
                return res.json({success: false, message: "access denied. Bro. Did you even send me a token?"})
            }
            else {
                // if it's a good cookie, tell console (debugging)
                console.log("good cookie");


                // IMPORTANT #6
                // ============
                // Without this next() call here, we can't tell the server
                // to move onto the API routes when the user has a good cookie.
                next();
            }
        });
    });
}