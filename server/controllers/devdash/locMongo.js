var spawn = require('child_process').spawn;

module.exports = function() {
  return {
    command: function(req, ins) {
      if(!req.body.cmd) return false;
      else {
        try {
          var cmd = req.body.cmd;
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
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      });
      // These two lines are needed by event-source-polyfill
      res.write(':' + Array(2049).join(' ') + '\n');
      res.write('retry: 2000\n');
      
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
    }
  }
}