var express = require("express");
var mo = require("method-override");
var bp = require("body-parser");
var path = require("path");
var GB = require("../models/giftbuddy.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// HTML GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases the user is shown an HTML page of content
	// ---------------------------------------------------------------------------

	//Root, where users log in or sign up
	app.get('/', function(req,res) {
		res.render('index');
	});


}