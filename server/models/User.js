var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: {type: String, required: '{PATH} is required.'},
  lastName: {type: String, required: '{PATH} is required.'},
  userName: {
    type: String, 
    required: '{PATH} is required.',
    unique: true
  },
  salt: {type: String, required: '{PATH} is required.'},
  hashed_pwd: {type: String, required: '{PATH} is required.'},
  roles: [String]
});
userSchema.methods = {
  authenticate: function(pwdToMatch) {
    return encrypt.hashPwd(this.salt, pwdToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.inedxOf(role) > -1;
  }
}
  
var User = mongoose.model('User', userSchema);
  
function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt, hash;
      salt1 = encrypt.createSalt();
      hash1 = encrypt.hashPwd(salt1, 'nodestagesadmin');
      salt2 = encrypt.createSalt();
      hash2 = encrypt.hashPwd(salt2, 'nodestage');
      salt3 = encrypt.createSalt();
      hash3 = encrypt.hashPwd(salt3, 'guest');
      User.create({firstName: 'Stage', lastName: 'Admin', userName: 'stageadmin', salt: salt1, hashed_pwd: hash1, roles: ['sadmin']})
      User.create({firstName: 'Justin', lastName: 'Lindsey', userName: 'jlindsey', salt: salt2, hashed_pwd: hash2, roles: ['admin']})
      User.create({firstName: 'Stage', lastName: 'Guest', userName: 'guest', salt: salt3, hashed_pwd: hash3, roles: []})
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;