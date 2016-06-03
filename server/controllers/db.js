var exec = require('child_process').exec;

exports.syncDb = function(req, res) {
  if(!req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  console.log('Beginning database sync process')
  var getc = 'mongodump -h ds056288.mlab.com:56288 -u jlindsey -p nodestagedev -d NodeStage -o ' + __dirname + '\\..\\db';
  var setc = 'mongorestore -d nodestage --drop ' + __dirname + '\\..\\db\\NodeStage';
  exec(getc, function(err, stdout, stderr) {
    if(err) { console.log(err); }
    if(stderr) { console.log(stderr); }
    console.log(stdout);
    console.log('Merging databases')
    exec(setc, function(err, stdout, stderr) {
      if(err) { console.log(err); }
      if(stderr) { console.log(stderr); }
      console.log(stdout);
      console.log('Database sync has completed')
      res.send({success: true});
    })
  });

}