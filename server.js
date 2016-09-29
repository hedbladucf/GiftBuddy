var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var exphbs = require('express-handlebars');

var routes = require('./GiftBuddy/controllers/giftbuddy_controllers.js');

var app = express();
var PORT = process.env.PORT || 3002;

//Serve static content for the app from the "public" directory in the application directory.
app.use('/static', express.static(__dirname + '/public'));


// app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use('/', routes);

app.listen(PORT);