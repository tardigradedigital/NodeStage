angular.module('stage').factory('stDevDbAzureSvc', function() {
  return {
      view: 'azureStream',
      viewType: 'view',
      status: false,
      streamWell: '',
      endPoint: '/api/devdash/azureStream/',
      eventSource: false,
      getStream: function() { return this.streamWell }
  };
});