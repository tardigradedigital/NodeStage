var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');
  
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

function compile(str, path) { return stylus(str).set('filename', path); }

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

if(env === 'development') mongoose.connect('mongodb://localhost/nodestage');
else mongoose.connect('mongodb://jlindsey:nodestagedev@ds056288.mlab.com:56288/NodeStage');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'An error occurred connecting to MongoDB...'));
db.once('open', function callback() {
  console.log('Connected to NodeStage database (MongoDB)')
});

app.get('/partials/*', function(req, res) {
  res.render('../../public/app/' + req.params[0]);
})

app.get('*', function(req, res) {
  res.render('index');
});

var port = process.env.PORT || 8080
app.listen(port);
console.log('Started Node Stage on port ' + port);