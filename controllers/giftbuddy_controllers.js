var express = require("express");
var mo = require("method-override");
var bp = require("body-parser");

var GB = require("../models/giftbuddy.js");
var router = express.Router();

//Root, where users log in or sign up
router.get('/', function(req,res) {
	res.render('index')
});


//Route for user authentication
router.post('/home', function(req,res) {

	GB.verifyUser('users', req.body.email, req.body.password, function(data){

		// console.log(data);
		console.log(data[0].usersFound + " users found");

		if (data[0].usersFound >= 1){

			GB.logOn(req.body.email, function(data){

				var userGroupsObject = {gifts: data};

				// console.log(data);
				console.log(userGroupsObject);

				res.render('home', userGroupsObject)
			});


		} else {
			res.redirect('/')
		}
	});
});

// //Route for user sign up
// router.post('/signup', function(req,res) {
// 	console.log(req.body);

// 	GB.createUser('users', req.body.full_name, req.body.address, req.bod.email, req.body.password, function(data){
// 		res.redirect('/')
// 	});
// });

// //Route for creating a group
// router.post('/groupup', function(req, res){
// 	console.log(req.body);

// 	GB.createGroup('groups', req.body.group_name, req.body.dollar_amount, function(data){
// 		res.redirect('/')
// 	})
// })




//Update
router.put('/update', function(req,res) {
	var condition = 'id = ' + req.body.id;

	var table = req.body.table;
	var column = req.body.column;
	var value = req.body.value;

	console.log('condition', condition);

	GB.update(table, {column: value, column2: value2}, condition, function(data){
		res.redirect('/home');
	});
});

module.exports = router;