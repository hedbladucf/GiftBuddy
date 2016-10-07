var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var jwt = require('jsonwebtoken');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3002;


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.set('jwtSecret', "CODINGROCKS")

//Serve static content for the app from the "public" directory in the application directory.
app.use('/static', express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// app.use(bodyParser.urlencoded({extended: false}));
// app.use('/', routes);


// By placing the auth-routes before api-routes, 
// we stop users from going to any api sections
// if they haven't passed the threshold of auth-routes.
require('./controllers/html-routes.js')(app); 
require('./controllers/auth-routes.js')(app); 
require('./controllers/giftbuddy_controllers.js')(app); 


app.listen(PORT);