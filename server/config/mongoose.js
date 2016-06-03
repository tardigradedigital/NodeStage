var mongoose = require('mongoose'),
    userModel = require('../models/User');

module.exports = function(config) {
  mongoose.connect(config.dbStr);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'An error occurred connecting to MongoDB...'));
  db.once('open', function callback() {
    console.log('Connected to //tardigrade/node [' + config.dbStr + ']');
  });
  
  userModel.createDefaultUsers();
};