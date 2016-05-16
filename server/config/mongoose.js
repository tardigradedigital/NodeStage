var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'An error occurred connecting to MongoDB...'));
  db.once('open', function callback() {
    console.log('Connected to //tardigrade/node database (MongoDB)')
    console.log('DB location: ' + config.db);
  });
  
  var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
  });
  userSchema.methods = {
    authenticate: function(pwdToMatch) {
      return hashPwd(this.salt, pwdToMatch) === this.hashed_pwd;
    }
  }
  
  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt1 = createSalt();
      hash1 = hashPwd(salt1, 'nodestagesadmin');
      salt2 = createSalt();
      hash2 = hashPwd(salt2, 'nodestage');
      salt3 = createSalt();
      hash3 = hashPwd(salt3, 'guest');
      User.create({firstName: 'Stage', lastName: 'Admin', userName: 'stageadmin', salt: salt1, hashed_pwd: hash1, roles: ['sadmin']})
      User.create({firstName: 'Justin', lastName: 'Lindsey', userName: 'jlindsey', salt: salt2, hashed_pwd: hash2, roles: ['admin']})
      User.create({firstName: 'Stage', lastName: 'Guest', userName: 'guest', salt: salt3, hashed_pwd: hash3, roles: []})
    }
  });
}

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha256', salt);
  return hmac.update(pwd).digest('hex');
  // hmac.setEncoding('hex');
  // hmac.write(pwd);
  // hmac.end();
  // return hmac.read();
}