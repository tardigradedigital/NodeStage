angular.module('stage').controller('stDevDbCtrl', function($scope, $http) {
  $scope.ddbView = null
  $scope.ddbConsoleType = null
  $scope.localMongoStatus = false;
  $scope.remoteMongoStatus = false;
  $scope.azureStreamStatus = false;
  $scope.ddbStreamWell = 'Waiting for connection...';

  $scope.ddbChangeView = function(svc) {
    switch(svc) {
      case 'overview': 
        $scope.ddbView = null;
        $scope.ddbConsoleType = null;
        break;
      case 'localMongo':
        $scope.ddbView = svc;
        $scope.ddbConsoleType = 'cmd';
        if(!$scope.ddbIsConnected(svc)) $scope.ddbConnect(svc);
        $scope.ddbStream(svc);
        break;
      case 'remoteMongo':
        $scope.ddbView = svc;
        $scope.ddbConsoleType = 'cmd';
        if(!$scope.ddbIsConnected(svc)) $scope.ddbConnect(svc);
        $scope.ddbStream(svc);
        break;
      case 'azureStream':
        $scope.ddbView = svc;
        $scope.ddbConsoleType = 'view';
        if(!$scope.ddbIsConnected(svc)) $scope.ddbConnect(svc);
        $scope.ddbStream(svc);
        break;
    }
  } 

  $scope.ddbConnect = function(svc) {
    $http.get('/api/devdash/' + svc + '/connect', {check: true}).then(function() {
      if(svc == 'localMongo') $scope.localMongoStatus = true;
      else if(svc == 'remoteMongo') $scope.remoteMongoStatus = true;
      else if(svc == 'azureStream') $scope.azureStreamStatus = true;
      $scope.ddbStreamWell = 'Connected to ' + svc;
    });
  }

  $scope.ddbIsConnected = function(svc) {
    $http.get('/api/devdash/' + svc + '/status', {check: true}).then(function(res) {
      if(svc == 'localMongo') {
        if(res.data == 'Connected' && res.status == 200) {
          $scope.localMongoStatus = true;
          return true;
        }
        else {
          $scope.localMongoStatus = false;
          return false;
        }
      }
      else if(svc == 'remoteMongo') {
        if(res.data == 'Connected' && res.status == 200) {
          $scope.remoteMongoStatus = true;
          return true;
        }
        else {
          $scope.remoteMongoStatus = false;
          return false;
        }
      }
      else if(svc == 'azureStream') {
        if(res.data == 'Connected' && res.status == 200) {
          $scope.azureStreamStatus= true;
          return true;
        }
        else {
          $scope.azureStreamStatus = false;
          return false;
        }
      }
    });
  }

  $scope.ddbStream = function(svc) {
    // if(!$scope.ddbIsConnected(svc)) return false;
    // else {
      console.log(typeof(EventSource));
      if(typeof(EventSource) !== 'undefined') {
        var strmSource = new EventSource('/api/devdash/' + svc + '/stream');
        strmSource.onmessage = function(event) {
          $scope.ddbStreamWell += JSON.parse(res.data);
          $scope.$apply();
        }
      }
      else $scope.ddbStreamWell = 'This browser does not support streaming.';
    // }
  }
});