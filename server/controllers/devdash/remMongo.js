var spawn = require('child_process').spawn;

module.exports = function() {
  return {
    command: function(req, ins) {
      if(!req.body.cmd) return false;
      else {
        try {
          var cmd = req.body.cmd;
          cmd = "db.users.find()";
          ins.stdin.write(cmd + "\n");
          return true;
        }
        catch(e) { return false; }
      } 
    },
    connect: function(res, rm) {
      res.writeHead(200, {"Content-Type": "application/json"});
      instance = spawn(rm.start, rm.params);
      instance.stdout.on('data', function(data) { res.end(JSON.stringify({response: 'Connected'})) });
      rm.instance = instance;
    },
    disconnect: function(res, rm) {
      if(rm.instance) rm.instance.kill();
      res.json({response: 'Disconnected'});
      // res.end('Disconnected');
    },
    stream: function(res, ins) {
      outStr = '';
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      });
      res.write('/n');
      ins.stdout.on('data', function(data) {
        outStr += data.toString();
        lines = outStr.split('\n');
        for(var i in lines) {
          var da = new Date();
          if(i == lines.length - 1) outStr = lines[i];
          else res.write('id: ' + da.getMilliseconds() + '\ndata:' + JSON.stringify(lines[i]) + '\n\n');
        }
      });
      ins.on('close', function(code) { res.end(outStr); });
      ins.stderr.on('data', function(data) { res.end('ERR: ' + data); });
      setInterval(function() { res.write('#heartbeat'); }, 15000);
    }
  }
}