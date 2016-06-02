var User = require('mongoose').model('User'),
    userCore = require('../models/User.js');
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.createUser = function(req, res, next) {
  var userData = req.body;
  userData.userName = userData.userName.toLowerCase();
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData, function (err, user) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate username');
      }
      res.status(400);
      return res.send({reason: err.toString()});
    }
    res.send(user);
  })
}

exports.purgeUsers = function(req, res) {
  var user = req.body;
  if(!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  User.remove({}, function(err) {
    console.log('User ' + req.user.userName + ' has purged the user database');
    if(err) { res.status(400); return res.send({reason: err.toString()})}
    userCore.createDefaultUsers();
    res.send({success: true});
  })

}

exports.updateUser = function(req, res) {
  var userUpdates = req.body;
  
  if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  
  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.userName = userUpdates.userName;
  if(userUpdates.password && userUpdates.password.length > 0) {
    req.user.salt = encrypt.createSalt();
    req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
  }
  req.user.save(function(err) {
    if(err) { res.status(400); return res.send({reason: err.toString()})}
    res.send(req.user);
  })
}