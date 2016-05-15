var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/nodestage',
    rootPath: rootPath,
    port: process.env.PORT || 8080
  },
  production: {
    db: 'mongodb://jlindsey:nodestagedev@ds056288.mlab.com:56288/NodeStage',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
}