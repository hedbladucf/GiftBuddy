var express = require("express");
var mo = require("method-override");
var bp = require("body-parser");

var GB = require("../models/giftbuddy.js");
var router = express.Router();

router.get('/', function(req,res) {
	res.render('index')
});
 
// //Read
// router.get('/burgers', function(req,res) {
// 	GB.selectAll('events', function(data){
// 		var hbsObject = {burgers : data}
// 		// console.log(hbsObject)
// 		res.render('index', hbsObject);
// 	});
// });

// //Create
// router.post('/burgers/create', function(req,res) {
// 	console.log(req.body.burger_name);
// 	burger.insertOne('events', req.body.burger_name, req.body.devoured, function(data){
// 		res.redirect('/burgers')
// 	});
// });

// //Update
// router.put('/burgers/update/:id', function(req,res) {
// 	var condition = 'id = ' + req.params.id;

// 	console.log('condition', condition);

// 	burger.updateOne('events', {'devoured' : req.body.devoured}, condition, function(data){
// 		res.redirect('/burgers');
// 	});
// });

module.exports = router;