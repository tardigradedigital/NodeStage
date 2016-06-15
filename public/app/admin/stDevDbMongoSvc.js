angular.module('stage').factory('stDevDbMongoSvc', function() {
  return {
    cloud: {
      view: 'cloudMongo',
      status: false,
      streamWell: '',
      endPoint: '/api/devdash/remoteMongo/',
      viewType: 'cmd'
    },
    dev: {
      view: 'devMongo',
      status: false,
      streamWell: '',
      endPoint: '/api/devdash/localMongo/',
      viewType: 'cmd'
    },
  };
});