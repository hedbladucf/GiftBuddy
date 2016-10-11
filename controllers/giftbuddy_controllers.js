var express = require("express");
var path = require("path");

var GB = require("../models/giftbuddy.js");
var Cookies     = require('cookies');

module.exports = function(app){
//We don't want the user id in the url because any person would be able to access any other persons profile

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//After logging in they are brought to the home page
	app.get('/home', function(req, res){

		//Grab their id from the cookie
		var cookie = req.headers.cookie;
		var cookieArray = cookie.split("--");
		var userID = cookieArray[0];

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
				};

				console.log(users_groupsObj);

				res.render('home', users_groupsObj);
			});

		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//After clicking on a group, they are brought to that groups page
	app.get('/group/:gID', function(req,res){

		//Grab their id from the cookie
		var cookie = req.headers.cookie;
		var cookieArray = cookie.split("--");
		var userID = cookieArray[0];

		var groupID = req.params.gID;

		//Make sure the user is in that group. There should only ever be 1 object returned, or a null object.
		GB.userInGroup(userID, groupID, function(data){

			console.log(data[0]);

			//If data is returned (they are in the group) add buddy to group
			if (data[0]){
				//Get data about all of this groups users users
				GB.allInGroup(groupID, function(data){

					var usersInfo data;

					GB.yourBuddyInfo(userID, function(data){

						var buddyInfo = data;

						var allPageInfo = {
							groupUsers: usersInfo,
							buddyInfo: buddyInfo
						}

						console.log(allPageInfo);

						res.render('singlegroup', allPageInfo);
					});
				});
			}
			//Otherwise bring them back to home page
			else{
				res.redirect('/home');
			}
		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//After clicking add group, are brought here
	app.get('/addGroup', function(req,res){

		//Grab their id from the cookie
		var cookie = req.headers.cookie;
		var cookieArray = cookie.split("--");
		var userID = cookieArray[0];

		GB.allBesidesUser(userID, function(data){
			var usersObj = {
				users:data
			}

			res.render('addgroup', usersObj);
		});
	});

	//After filling out the add group form. Redirects user to the new group page
	app.post('/initializeGroup', function(req, res){
		var cookie = req.headers.cookie;
		var cookieArray = cookie.split("--");
		var userID = cookieArray[0];

		var group_name = req.body.group_name;
		var dollar_amount = req.body.dollar_amount;

		//Create the group with name and dollar amount
		GB.createGroup('groups', group_name, dollar_amount, function(data){
			
			//Then grab the id of the newly created group
			GB.findGroup('groups', group_name, function(data){

				// console.log(data[0].g_id);

				var groups_id = data[0].g_id;

				// //Then add the users_groups entry
				GB.addUserToGroup('users_groups', userID, groups_id, 1, function(data){
					console.log("User # " + userID + " added ");

					res.redirect('/group/' + groups_id);
				});
			});
		});
	});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	//When the user clicks to add a friend
	app.post('/group/:gID/addBuddy', function(req,res){

		//Grab their id from the cookie
		var cookie = req.headers.cookie;
		var cookieArray = cookie.split("--");
		var userID = cookieArray[0];

		var groupID = req.params.gID;

		//Make sure the user is in that group. There should only ever be 1 object returned, or a null object.
		GB.userInGroup(userID, groupID, function(data){

			console.log(data[0]);

			//If data is returned (they are in the group) add buddy to group
			if (data[0]){
				//Add the user to the database
				GB.addUserToGroup('users_groups', userID, groupID, 0, function(data){
					console.log("user # " + userID + " added to group # " + groupID);

					//Then redirect to the group page
					res.redirect('/group/' + groupID);
				});
			}
			//Otherwise bring them back to home page
			else{
				res.redirect('/home');
			}
		});
	});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

	app.get('/yourAccount', function(req, res){

		//Grab their id from the cookie
		var cookie = req.headers.cookie;
		var cookieArray = cookie.split("--");
		var userID = cookieArray[0];


		GB.userAccountInfo(userID, function(data){

			var accountObj = {account: data};

			res.render('youraccount', accountObj);

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