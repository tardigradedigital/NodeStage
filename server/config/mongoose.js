var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'An error occurred connecting to MongoDB...'));
  db.once('open', function callback() {
    console.log('Connected to //tardigrade/node [' + config.db + ']');
  });
  
  userModel.createDefaultUsers();
  courseModel.createDefaultCourses();
};