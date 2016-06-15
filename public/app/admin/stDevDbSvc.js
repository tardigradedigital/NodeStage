angular.module('stage').factory('stDevDbSvc', function($http, $interval, $q, stDevDbAzureSvc, stDevDbMongoSvc) {
  return {
    currentSvc: null,
    svcList: { 
      cloudMongo: stDevDbMongoSvc.cloud,
      devMongo: stDevDbMongoSvc.dev,
      azureStream: stDevDbAzureSvc
    },

    sendRequest: function(method, url, successCallback, errorCallback, svc, data) {
      svc = svc ? this.svcList[svc] : false
      data = data ? data : {}
      return $http({
        method: method,
        url: (svc ? svc.endPoint : currentSvc.endPoint) + url,
        data: data
      }).then(successCallback, errorCallback);
    },

    checkStatus: function(svc) {
      if(!svc && this.currentSvc == null) return false;
      return this.sendRequest('GET', 'status', 
        // Success callback
        function(response) {
          if(response.data.response == 'Connected' && response.status == 200) { return true; }
          else if(response.status !== 200) return { error: response.status };
          else { return false; }
        },
        // Error callback
        function(response) { return { error: response.status }; },
        // Pass specific service if needed
        (svc ? svc : false)
      ).then(
        // Success callback
        function(response) {
          if(!response['error']) {
            if(response) {
              if(!svc) this.currentSvc.status = true;
              return true;
            }
            else {
              if(!svc) this.currentSvc.status = false;
              return false;
            }
          }
          else {
            if(!svc) this.currentSvc.status = false;
            return { code: response.error, msg: 'Failed to connect to service: Unexpected response' };
          }
        },
        // Error callback
        function(response) {
          if(!svc) this.currentSvc.status = false;
          return { code: response.error, msg: 'Failed to connect to service: Unexpected response' };
        }
      );
    },

    connectService: function(svc) {
      this.currentSvc = this.svcList[svc];
      var response = this.sendRequest('GET', 'connect',
        // Success callback
        function(response) {
          if(response.data.response == 'Connected' && response.status == 200) { return true; }
          else { return false; }
        },
        // Error callback
        function(response) { return {error: response.status}; },
        // Pass service
        svc
      );

      if(!response['error']) { this.currentSvc.status = true; }
      else {
        this.currentSvc.status = false;
        throw { code: response.status, msg: 'Failed to connect to service: Unexpected response' };
      }
    },

    getConsoleType: function(svc) {
      return this.svcList[svc].viewType;
    },

    updateStreamWell: function(msg) {

    }
  };
});



