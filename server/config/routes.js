var auth = require('./auth'),
    fs = require('fs'),
    users = require('../controllers/users'),
    db = require('../controllers/db'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {
  
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', auth.requiresRole('admin'), users.createUser);
  app.put('/api/users', auth.requiresRole('admin'), users.updateUser);
  app.purge('/api/users', auth.requiresRole('admin'), users.purgeUsers);
  
  app.copy('/api/db', auth.requiresRole('admin'), db.syncDb);
  
  app.get('/admin/*', auth.requiresRole('admin'), function(req, res) {
    if(req.headers.referer) {
      var path = '../../public/app/admin/' + req.params[0];
      res.render(path); 
    }
    else {
      try {
        fs.statSync()
        var path = '../../public/app/admin/' + req.params[0];
        res.render(path); 
      }
      catch(e) {
        res.render('index', {
          bootstrappedUser: req.user
        });
      }
    }
  });
  
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });
    
  app.post('/login', auth.authenticate);
  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res) {
    res.sendStatus(404);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
}