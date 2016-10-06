var express = require("express");
var path = require("path");

var GB = require("../models/giftbuddy.js");
var auth = require("./auth-routes.js").userInfo;

var userID = null;
var groupID = null;

module.exports = function(app){
//We don't want the user id in the url because any person would be able to access any other persons profile

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//After logging in, user is redirected here.
	//This route is needed to grab the user's id and temporarily make it global
	app.get('/home/:uID/hidden/route', function(req,res) {
		userID = req.params.uID;
		res.redirect('/home');
	});

	//Then they are brought to the home page
	app.get('/home', function(req, res){
		//Grab their name
		GB.findUserName('users', userID, function(data){
			// console.log(data);

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
					userID: userID
				};

				userID = null;
				groupID = null;

				console.log(users_groupsObj);

				res.render('home', users_groupsObj);
			});

		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//Route when user clicks on one of their groups
	app.get('/user/:uID/group/:gID/hidden/route', function(req, res){
		userID = req.params.uID;
		groupID = req.params.gID;

		res.redirect('/group');
	});

	//They are brought to that groups page
	app.get('/group', function(req,res){
		//Find all the users in that group and render them on the singlegroup page
		GB.allInGroup(groupID, function(data){

			var usersInGroupObj = {
				users: data,
				userID: userID,
			};

			groupID = null;
			userID = null;

			console.log(usersInGroupObj);

			res.render('singlegroup', usersInGroupObj);
		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//When user clicks on add group button
	app.get('/user/:uID/addGroup/hidden/route', function(req, res){
		userID = req.params.uID;

		res.redirect('/addGroup');

	});

	//They are brought here
	app.get('/addGroup', function(req,res){
		var idObj = {id: userID};

		userID = null;
		groupID = null;
		res.render('addgroup', idObj);
	});

	//After filling out the add group form. Redirects user to the new group page
	app.post('/user/:uID/initializeGroup', function(req, res){

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

					res.redirect('/user/' + users_id + '/group/' + groups_id + "/hidden/route");
				});
			});
		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//When a user signs up, they are verified and redirected to /home
	app.post('/user/create', function(req, res){

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
					//Grab their id from the database, based off the provided email
					GB.findUserID('users', userEmail, function(data){
						// console.log(data);

						userID = data[0].u_id;

						res.redirect('/home')

					});

				} else {
					res.redirect('/');
				}
			});



		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


	//When an admin adds a user to a group
	app.get('/groups/:gID/addUser', function(req,res){

		userID = req.body.users_id;
		groupID = req.params.gID;

		res.redirect('/addBuddy');
	});


	app.post('/addBuddy', function(req,res){
		//Add the user to the database and redirect to that group's page
		GB.addUserToGroup('users_groups', userID, groups_id, 0, function(data){
			console.log("user # " + userID + " added ");

			res.redirect('/home');
			
		});
	});










	//Update anything in the database
	app.put('/update', function(req,res) {
		var condition = 'id = ' + req.body.id;

		var table = req.body.table;
		var column = req.body.column;
		var value = req.body.value;

		console.log('condition', condition);

		GB.update(table, {column: value}, condition, function(data){
			res.redirect('/home');
		});
	});


};