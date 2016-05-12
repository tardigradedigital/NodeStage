var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 80;

// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uw03mypu');

app.use('/node_modules', express.static('./node_modules'));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

app.get('/', function(req, res) { res.sendFile('./public/index.html'); });

app.listen(port);
console.log("Stage started on " + port);