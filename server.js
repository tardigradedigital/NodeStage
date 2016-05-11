var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uw03mypu');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(express.static('./node_modules'));

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
})

app.listen(process.env.PORT);
console.log("Stage started on port 80");