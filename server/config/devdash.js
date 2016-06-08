var config = require('./config'),
    ddblm = require('../controllers/devdash/locMongo')(),
    ddbrm = require('../controllers/devdash/remMongo')(),
    ddbas = require('../controllers/devdash/azureStream')();

module.exports = function() {
  return {
    localMongo: {
      // start: 'mongo',
      // params: [
      //   config['development'].db
      // ],
      start: 'cmd',
      params: [],
      instance: null,
      connect: ddblm.connect,
      stream: ddblm.stream,
      command: ddblm.command
    },
    remoteMongo: {
      start: 'mongo',
      params: [
        config['production'].dbHost + '/' + config['production'].db,
        '-u', config['production'].dbUser,
        '-p', config['production'].dbPass
      ],
      instance: null,
      connect: ddbrm.connect,
      stream: ddbrm.stream,
      command: ddbrm.command
    },
    azureStream: {
      start: 'azure',
      params: ['site log tail td-nodestage'],
      instance: null,
      connect: ddbas.connect,
      stream: ddbas.stream
    }
  }
}