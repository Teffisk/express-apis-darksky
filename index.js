// Require node modules that you need
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var geocoder = require('simple-geocoder');
var request = require('request');

// Declare your app
var app = express();

// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(parser.urlencoded({ extended: false }));

// Declare routes
app.get('/', function(req, res){
	res.render('home');
});

app.post('/', function(req, res){
	request('https://api.darksky.net/forecast/'+process.env.DARKSKY_API_KEY+'/'+locations.x+','+locations.y, function(err, response, body) {
	if(err) {console.log('error: '+err);
	} else {
		var results = JSON.parse(body);
		geocoder.geocode(req.body.userquery, function(success, locations) {
			console.log(DARKSKY_API_KEY)
			console.log("Location: ", locations.x, locations.y)
		})
		res.render('result', {userquery: req.body.userquery, longitude: locations.x, latitude: locations.y});
		}
	})
});
// Listen on PORT 3000
app.listen(3000, function(){
  console.log('I\'m listening to the smooth sounds of port 3000 in the morning. ☕');
});
