var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'An error occurred connecting to MongoDB...'));
  db.once('open', function callback() {
    console.log('Connected to //tardigrade/node database (MongoDB)')
  });
  
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String
  });
  
  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      User.create({firstName: 'Justin', lastName: 'Lindsey', userName: 'jlindsey'})
    }
  });
}