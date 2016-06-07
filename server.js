var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];
var ddb = require('./server/config/devdash')();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, env, ddb);

app.listen(config.port);
console.log('Running //tardigrade/node on port ' + config.port);