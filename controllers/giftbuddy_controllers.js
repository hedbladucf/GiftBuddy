var express = require("express");
var path = require("path");

var GB = require("../models/giftbuddy.js");
var auth = require("./auth-routes.js").userInfo;



module.exports = function(app){


	//When a user signs up, they are verified and home page rendered
	app.post('/users/create', function(req, res){

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

	//Route for user authentication and rendering home page
	app.get('/home/:uID', function(req,res) {

		var userID = req.params.uID;

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

				console.log(users_groupsObj);

				res.render('home', users_groupsObj);
			});

		});

	});



	//Functions that require auth//

	//Route when user clicks on one of their groups
	app.get('/users/:uID/group/:gID', function(req, res){

		var userID = req.params.uID;
		var groupsID = req.params.gID;

		//Find all the users in that group and render them on the singlegroup page
		GB.allInGroup(groupsID, function(data){

			var usersInGroupObj = {
				users: data,
				userID: userID,
			};

			console.log(usersInGroupObj);

			res.render('singlegroup', usersInGroupObj);
		});
	});


	//When user clicks on add group button
	app.get('/users/:uID/addGroup', function(req, res){
		var userID = req.params.uID
		var idObj = {id: userID};

		res.render('addgroup', idObj);
	});

	//Intermediate for creating a group. Eventaully redirects to groups page
	app.post('/users/:uID/initializeGroup', function(req, res){

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
	app.post('/groups/:gID/addUser', function(req,res){

		var users_id = req.body.users_id;
		var groups_id = req.params.gID;

		//Add the user to the database and redirect to that group's page
		GB.addUserToGroup('users_groups', users_id, groups_id, 0, function(data){
			console.log("user # " + users_id + " added ");
			res.redirect('/users/' + users_id + 'group/' + groups_id);
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