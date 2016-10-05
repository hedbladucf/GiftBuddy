var express = require("express");
var mo = require("method-override");
var bp = require("body-parser");

var GB = require("../models/giftbuddy.js");
var router = express.Router();


//Root, where users log in or sign up
router.get('/', function(req,res) {
	res.render('index')
});


//Route for user authentication and rendering home page
router.post('/home', function(req,res) {

	GB.verifyUser('users', req.body.email, req.body.password, function(data){
		// console.log(data);
		console.log(data[0].usersFound + " users found");

		if (data[0].usersFound >= 1){
			GB.logOn(req.body.email, function(data){

				var users_groupsObj = {groups: data};
				var fullName = users_groupsObj.groups[0].full_name;

				users_groupsObj = {groups:data, name: fullName};

				console.log("Full name is " + fullName);
				console.log(users_groupsObj);

				res.render('home', users_groupsObj)
			});

		} else {
			res.redirect('/')
		}
	});
});


//Route when user clicks on one of their groups
router.get('/users/group/:id', function(req, res){

	var groupsID = req.params.id;

	//Find all the users in that group and render them on the singlegroup page
	GB.allInGroup(groupsID, function(data){
		var usersInGroupObj = {users: data};

		console.log(usersInGroupObj);

		res.render('singlegroup', usersInGroupObj);
	})
});


//When a user signs up, they are verified and home page rendered
router.post('/users/create', function(req, res){

	var fullName = req.body.firstName + " " + req.body.lastName;
	var newEmail = req.body.email;
	var newPass = req.body.password;

	GB.createUser('users', fullName, newEmail, newPass, function(data){

		GB.verifyUser('users', newEmail, newPass, function(data){
			// console.log(data);
			console.log(data[0].usersFound + " users found");

			if (data[0].usersFound >= 1){
				GB.logOn(req.body.email, function(data){

					var users_groupsObj = {gifts: data};

					// console.log(data);
					console.log(users_groupsObj);

					res.render('home', users_groupsObj)
				});

			} else {
				res.redirect('/')
			}
		});


	});
});


//Route for creating a group
router.post('/groups/create', function(req, res){
	console.log(req.body);

	GB.createGroup('groups', req.body.group_name, req.body.dollar_amount, function(data){
		res.redirect('/')
	})
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