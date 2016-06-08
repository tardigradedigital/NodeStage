var spawn = require('child_process').spawn;

module.exports = function() {
  return {
    command: function(req, ins) {
      if(!req.body) return false;
      else {
        try {
          var cmd = req.body.cmd;
          // cmd = "db.users.find()";
          cmd = "ping 10.1.0.1";
          ins.stdin.write(cmd + "\n");
          return true;
        }
        catch(e) { return false; }
      } 
    },
    connect: function(res, lm) {
      outStr = '';
      instance = spawn(lm.start, lm.params);
      
      instance.stdin.setEncoding('utf-8');
      instance.stdout.on('data', function(data) {
        res.status(200);
        res.end();
      });
      lm.instance = instance;
    },
    disconnect: function(res, lm) {
      if(lm.instance) lm.kill();
      res.end('Disconnected');
    },
    stream: function(res, ins) {
      outStr = '';
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      });
      ins.stdout.on('data', function(data) {
        outStr += data.toString();
        lines = outStr.split('\n');
        for(var i in lines) {
          if(i == lines.length - 1) outStr = lines[i];
          else res.write(lines[i] + "\n");
        }
      });
      ins.on('close', function(code) { res.end(outStr); });
      ins.stderr.on('data', function(data) { res.end('ERR: ' + data); });
    }
  }
}