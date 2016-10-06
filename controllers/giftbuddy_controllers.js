var express = require("express");
var mo = require("method-override");
var bp = require("body-parser");

var GB = require("../models/giftbuddy.js");
var router = express.Router();


var tempUserObject = {
	email: null,
	password: null,
	sessionTime: 1000 * 60 * 1,

	startSession: function(email, pass){
		this.email = email;
		this.password = pass;

		//Set a timer for 10 seconds
		setTimeout(function(){
			tempUserObject.email = null;
			tempUserObject.password = null;

			console.log("Session ended");
		}, this.sessionTime)
	}
};




//Root, where users log in or sign up
router.get('/', function(req,res) {
	res.render('index');
});

//This is the route for when the user is redirected home through another route
router.get('/home', function(req, res){
	console.log("works");

	//If there is already a session in progress, assign email and user pass
	if (tempUserObject.email && tempUserObject.password){
		userEmail = tempUserObject.email;
		userPass = tempUserObject.password;

		//Then verify that email and password match
		GB.verifyUser('users', userEmail, userPass, function(data){
			var numUsersFound = data[0].usersFound;

			// console.log(data);
			console.log(numUsersFound + " users found");

			//If the user is found
			if (numUsersFound == 1){
				//Grab their id and name from the database, based off the provided email
				GB.findUserID('users', userEmail, function(data){
					// console.log(data);

					var userID = data[0].u_id;
					var fullName = data[0].full_name.split(" ");

					var firstName = fullName[0];
					var lastName = fullName[1];

					console.log("Full name " + firstName + " " + lastName);

					//Then render the page based on information provided by their id
					GB.logOn(userID, function(data){

						var users_groupsObj = {
							groups:data, 
							firstName: firstName, 
							lastName: lastName,
							userID:userID
						};

						console.log(users_groupsObj);

						res.render('home', users_groupsObj);
					});

				});

			} else {
				res.redirect('/');
			}
		});
	}
	//Otherwise make them log in again
	else{
		res.redirect('/');
	}
});


//Route for user authentication and rendering home page
router.post('/home', function(req,res) {

	var userEmail = req.body.email;
	var userPass = req.body.password;

	//verifyUser matches email and password
	GB.verifyUser('users', userEmail, userPass, function(data){
		var numUsersFound = data[0].usersFound;

		// console.log(data);
		console.log(numUsersFound + " users found");

		//If the user is found
		if (numUsersFound == 1){
			//Grab their id and name from the database, based off the provided email
			GB.findUserID('users', userEmail, function(data){
				// console.log(data);

				var userID = data[0].u_id;
				var fullName = data[0].full_name.split(" ");

				var firstName = fullName[0];
				var lastName = fullName[1];

				console.log("Full name " + firstName + " " + lastName);

				//Store their email and pass in this file. Then start the timer
				tempUserObject.startSession(userEmail, userPass);

				//Then render the page based on information provided by their id
				GB.logOn(userID, function(data){

					var users_groupsObj = {
						groups:data, 
						firstName: firstName, 
						lastName: lastName,
						userID:userID
					};

					console.log(users_groupsObj);

					res.render('home', users_groupsObj);
				});

			});

		} else {
			res.redirect('/');
		}
	});
});


//Route when user clicks on one of their groups
router.get('/users/:uID/group/:gID', function(req, res){

	var userID = req.params.uID;
	var groupsID = req.params.gID;

	console.log(tempUserObject);

	//If there is data stored in the local session object
	if (tempUserObject.email && tempUserObject.password){

		//Verify that they are the user with uID
		GB.verifyUserID('users', userID, function(data){

			var fetchedEmail = data[0].email;
			var fetchedPassword = data[0].password;

			//If the temp pass/email match the one corresponding the the ID in the url
			if (tempUserObject.email == fetchedEmail && tempUserObject.password == fetchedPassword){

				//Find all the users in that group and render them on the singlegroup page
				GB.allInGroup(groupsID, function(data){

					var usersInGroupObj = {
						users: data,
						userID: userID,
					};

					console.log(usersInGroupObj);

					res.render('singlegroup', usersInGroupObj);
				});
			}else {
				res.redirect('/home');
			}
		});

	}else{
		res.redirect('/');
	};

});


//When a user signs up, they are verified and home page rendered
router.post('/users/create', function(req, res){

	var fullName = req.body.firstName + " " + req.body.lastName;
	var newEmail = req.body.email;
	var newPass = req.body.password;

	GB.createUser('users', fullName, newEmail, newPass, function(data){

		//verifyUser matches email and password
		GB.verifyUser('users', newEmail, newPass, function(data){
			var numUsersFound = data[0].usersFound;

			// console.log(data);
			console.log(numUsersFound + " users found");

			//If the user is found
			if (numUsersFound == 1){
				//Grab their id and name from the database, based off the provided email
				GB.findUserID('users', userEmail, function(data){
					// console.log(data);

					var userID = data[0].u_id;
					var fullName = data[0].full_name.split(" ");

					var firstName = fullName[0];
					var lastName = fullName[1];

					console.log("Full name " + firstName + " " + lastName);

					//Then render the page based on information provided by their id
					GB.logOn(userID, function(data){

						var users_groupsObj = {
							groups:data, 
							firstName: firstName, 
							lastName: lastName,
							userID:userID
						};

						console.log(users_groupsObj);

						res.render('home', users_groupsObj);
					});

				});

			} else {
				res.redirect('/');
			}
		});



	});
});

//When clicking on add group button
router.get('/users/:uID/addGroup', function(req, res){
	var userID = req.params.uID
	var idObj = {id: userID};

	//If there is a session in progress
	if (tempUserObject.email && tempUserObject.password){
		//Verify that they are the user with uID
		GB.verifyUserID('users', userID, function(data){

			var fetchedEmail = data[0].email;
			var fetchedPassword = data[0].password;

			//If the temp pass/email match the one corresponding the the ID in the url
			if (tempUserObject.email == fetchedEmail && tempUserObject.password == fetchedPassword){

				res.render('addgroup', idObj);
			}
			//If for some reason they don't match, redirect back home
			else {
				res.redirect('/home');
			}
		});
	}
	//If there is not a session, make them log in again
	else {
		res.redirect('/');
	}


});

//Intermediate for creating a group. Eventaully redirects.
router.post('/users/:uID/initializeGroup', function(req, res){

	var users_id = req.params.uID;
	var group_name = req.body.group_name;
	var dollar_amount = req.body.dollar_amount;

	//Create the group with name and dollar amount
	GB.createGroup('groups', group_name, dollar_amount, function(data){
		
		//Then grab the id of the newly created group
		GB.findGroup('groups', group_name, function(data){

			// console.log(data[0].g_id);

			var groups_id = data[0].g_id;

			// //Then add the users_groups entry
			GB.addUserToGroup('users_groups', users_id, groups_id, 1, function(data){
				console.log("User # " + users_id + " added ");

				res.redirect('/users/' + users_id + '/group/' + groups_id);
			});
		});
	});
});


//When an admin adds a user to a group
router.post('/groups/:id/addUser', function(req,res){

	var users_id = req.body.users_id;
	var groups_id = req.params.id;

	//Add the user to the database and redirect to that group's page
	GB.addUserToGroup('users_groups', users_id, groups_id, 0, function(data){
		console.log("user # " + users_id + " added ");
		res.redirect('/users/group/'+groups_id);
	});
});




//Update anything in the database
router.put('/update', function(req,res) {
	var condition = 'id = ' + req.body.id;

	var table = req.body.table;
	var column = req.body.column;
	var value = req.body.value;

	console.log('condition', condition);

	GB.update(table, {column: value}, condition, function(data){
		res.redirect('/home');
	});
});

module.exports = router;