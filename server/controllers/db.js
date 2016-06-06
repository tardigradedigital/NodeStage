var exec = require('child_process').exec,
    rawCfg = require('../config/config'),
    rimraf = require('rimraf');

exports.syncDb = function(req, res) {
  if(!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }
  if(!req.body.collection || !req.body.direction) {
    res.status(400);
    return res.end();
  }
  console.log('Beginning database sync process');
  console.log('Syncing collection "' + req.body.collection + '", direction ' + req.body.direction);
  if(req.body.collection == 'users') {
    if(req.body.direction == 'toloc') { getCfgKey = 'production'; setCfgKey = 'development'; }
    else if(req.body.direction == 'torem') { getCfgKey = 'development'; setCfgKey = 'production' }
    else {
      res.status(503);
      return res.end();
    }
    
    var getc = 'mongodump -h ' + rawCfg[getCfgKey].dbHost + (rawCfg[getCfgKey].dbUser ? ' -u ' + rawCfg[getCfgKey].dbUser : '') + (rawCfg[getCfgKey].dbPass ? ' -p ' + rawCfg[getCfgKey].dbPass : '') + ' -d ' + rawCfg[getCfgKey].db + ' -c users -o "' + __dirname + '\\..\\db"';
    var setc = 'mongorestore -h ' + rawCfg[setCfgKey].dbHost + (rawCfg[setCfgKey].dbUser ? ' -u ' + rawCfg[setCfgKey].dbUser : '') + (rawCfg[setCfgKey].dbPass ? ' -p ' + rawCfg[setCfgKey].dbPass : '') +' -d ' + rawCfg[setCfgKey].db + ' --drop "' + __dirname + '\\..\\db\\' + rawCfg[getCfgKey].db + '"';
    
    var errenc = false;
    exec(getc, function(err, stdout, stderr) {
      if(err) { console.log(err); errenc = true; }
      if(!errenc) {
        console.log('Merging databases');
        exec(setc, function(err, stdout, stderr) {
          if(err) { console.log(err); errenc = true; }
          if(!errenc) {
            console.log('Database sync has completed');
            console.log('Removing temporary files');
            rimraf(__dirname + '\\..\\db\\' + rawCfg[getCfgKey].db, function(err) { if(err) { console.log('Failed to remove temporary files: ' + err); } });
            res.send({success: true});
          }
          else {
            console.log('Failed to restore database'); 
            res.status(500); 
            return res.end();
          }
        });
      }
      else { 
        console.log('Failed to dump database'); 
        res.status(500); 
        return res.end();
      }
    });
  }

}