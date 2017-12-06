// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('twitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamReactHandler = require('./utils/streamReactHandler'),
  streamNodeHandler = require('./utils/streamNodeHandler'),
  streamHandler = require('./utils/streamHandler');
var bodyParser = require('body-parser');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/react-tweets');

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/react', routes.react);
app.get('/node', routes.node);

app.post('/', function(req, res){
  routes.index(req, res);
});

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'react'}, function(stream){
  console.log("reactstream", stream);
  streamReactHandler(stream,io);
});

twit.stream('statuses/filter',{ track: 'nodejs'}, function(stream){
  streamNodeHandler(stream,io);
});

twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
  streamHandler(stream,io);
});


/*twit.get('statuses/user_timeline', 'react.js', function(error, tweets, response) {
  if (!error) {
    console.log('tweets', tweets);
    console.log('response', response);
  }
});*/

/*twit.get('search/tweets', {q: 'react.js', result_type: 'recent', count: 10}, function(error, tweets, response) {
  if(!error){
    console.log(tweets);
  }
});*/
