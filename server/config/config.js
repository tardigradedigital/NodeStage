var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'nodestage',
    dbHost: 'localhost',
    dbPass: null,
    dbStr: 'mongodb://localhost/nodestage',
    dbUser: null,
    rootPath: rootPath,
    port: process.env.PORT || 8080
  },
  production: {
    db: 'NodeStage',
    dbHost: 'ds056288.mlab.com:56288',
    dbPass: 'nodestagedev',
    dbStr: 'mongodb://jlindsey:nodestagedev@ds056288.mlab.com:56288/NodeStage',
    dbUser: 'jlindsey',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}