exports.localMongo = function(req, res) {
  lm = req.app.locals.ddb.localMongo;
  switch(req.params.act) {
    case 'connect':
      if(!lm.instance) lm.connect(res, lm);
      else res.end();
      break;
    case 'stream':
      if(!lm.instance) res.end('Disconnected');
      else lm.stream(res, lm.instance);
      break;
    case 'command':
      if(!lm.instance) res.end('Disconnected');
      else {
        if(lm.command(req, lm.instance)) {
          res.status(200);
          res.end();
        }
        else {
          res.status(400);
          res.end();
        }
      }
      break;
    case 'status':
      if(lm.instance && lm.instance.connected) res.end('Connected');
      else res.end('Disconnected');
      break;
  }
}

exports.remoteMongo = function(req, res) {
  rm = req.app.locals.ddb.remoteMongo;
  switch(req.params.act) {
    case 'connect':
      if(!rm.instance) rm.connect(res, rm);
      else res.end();
      break;
    case 'stream':
      if(!rm.instance) res.end('Disconnected');
      else rm.stream(res, rm.instance);
      break;
    case 'command':
      if(!rm.instance) res.end('Disconnected');
      else {
        if(rm.command(req, rm.instance)) {
          res.status(200);
          res.end();
        }
        else {
          res.status(400);
          res.end();
        }
      }
      break;      
    case 'status':
      if(rm.instance && rm.instance.connected) res.end('Connected');
      else res.end('Disconnected');
      break;
  }
}

exports.azureStream = function(req, res) {
  azs = req.app.locals.ddb.azureStream;
  switch(req.params.act) {
    case 'connect':
      if(!azs.instance) azs.connect(res, azs);
      else res.end();
      break;
    case 'stream':
      if(!azs.instance) res.end('Disconnected');
      else azs.stream(res, azs);
      break;
    case 'status':
      if(azs.instance && azs.instance.connected) res.end('Connected');
      else res.end('Disconnected');
      break;
  }
}