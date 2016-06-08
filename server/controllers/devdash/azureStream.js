var spawn = require('child_process').spawn,
    c = require('child_process');

module.exports = function() {
  return {
    connect: function(res, azs) {
      instance = spawn(azs.start, azs.params).on('error', function(err) {console.log(err)});
      
      instance.stdin.setEncoding('utf-8');
      instance.stdout.on('data', function(data) {
        res.status(200);
        res.end();
      });

      azs.instance = instance;
    },
    disconnect: function(res, azs) {
      if(azs.instance) azs.kill();
      res.end('Disconnected');
    },
    stream: function(res, azs) {
      outStr = '';
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      });
      azs.instance.stdout.on('data', function(data) {
        outStr += data.toString();
        lines = outStr.split('\n');
        for(var i in lines) {
          if(i == lines.length - 1) outStr = lines[i];
          else res.write(lines[i] + "\n");
        }
      });
      azs.instance.on('close', function(code) { res.end(outStr); });
      azs.instance.stderr.on('data', function(data) { res.end('ERR: ' + data); });

      console.log('Stream received');
    }
  }
}