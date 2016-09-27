// DEPENDENCIES
var express = require('express');
var mysql = require('mysql');

var routes = require('./GiftBuddy/controllers/giftbuddy_controllers.js');

// CONNECTION
var connection = require('./GiftBuddy/config/connection.js');

// MIDDLEWARE
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// HANDLEBARS
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main',
//     extname: '.handlebars',
//     layoutsDir: 'burger/views/layouts'}));
// app.set('view engine','handlebars');
// app.set('views', __dirname + '/burger/views');

// ROUTES





// CONFIRMATION
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('App listening on PORT: ' + PORT);
});