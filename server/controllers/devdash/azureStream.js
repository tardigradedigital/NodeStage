var spawn = require('child_process').spawn,
    c = require('child_process');

module.exports = function() {
  return {
    connect: function(res, azs) {
      res.writeHead(200, {"Content-Type": "application/json"});
      instance = spawn(azs.start, azs.params).on('error', function(err) {console.log(err)});
      instance.stdout.on('data', function(data) { res.end(JSON.stringify({response: 'Connected'})) });
      azs.instance = instance;
    },
    disconnect: function(res, azs) {
      if(azs.instance) azs.kill();
      res.json({response: 'Disconnected'});
      // res.end('Disconnected');
    },
    stream: function(res, azs) {
      outStr = '';
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      });
      res.write('/n');
      azs.instance.stdout.on('data', function(data) {
        outStr += data.toString();
        lines = outStr.split('\n');
        for(var i in lines) {
          var da = new Date();
          if(i == lines.length - 1) outStr = lines[i];
          else res.write('id: ' + da.getMilliseconds() + '\ndata:' + JSON.stringify(lines[i]) + '\n\n');
        }
      });
      azs.instance.on('close', function(code) { res.end(outStr); });
      azs.instance.stderr.on('data', function(data) { res.end('ERR: ' + data); });
      setInterval(function() { res.write('#heartbeat'); }, 15000);
    }
  }
}