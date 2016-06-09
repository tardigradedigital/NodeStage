angular.module('stage').controller('stDevDbCtrl', function($scope, $http, $timeout) {
  $scope.ddbView = null
  $scope.ddbConsoleType = null
  $scope.localMongoStatus = false;
  $scope.remoteMongoStatus = false;
  $scope.azureStreamStatus = false;
  $scope.ddbStreamWell = '';

  $scope.ddbChangeView = function(svc) {
    switch(svc) {
      case 'overview': 
        $scope.ddbView = null;
        $scope.ddbConsoleType = null;
        break;
      case 'localMongo':
        $scope.ddbView = svc;
        $scope.ddbConsoleType = 'cmd';
        $scope.ddbStreamWell = 'Connecting...';
        if(!$scope.localMongoStatus) $scope.ddbConnect(svc);
        break;
      case 'remoteMongo':
        $scope.ddbView = svc;
        $scope.ddbConsoleType = 'cmd';
        $scope.ddbStreamWell = 'Connecting...';
        if(!$scope.remoteMongoStatus) $scope.ddbConnect(svc);
        break;
      case 'azureStream':
        $scope.ddbView = svc;
        $scope.ddbConsoleType = 'view';
        $scope.ddbStreamWell = 'Connecting...';
        if(!$scope.azureStreamStatus) $scope.ddbConnect(svc);
        break;
    }
  }

  $scope.ddbCommand = function() {
    var svc = $scope.ddbView;
    console.log(svc);
    if($scope.ddbConsoleType !== 'cmd') return false;
    else {
      console.log('Type is cmd');
      console.log($scope.ddbCmdBar);
      console.log($scope.ddbIsConnected(svc));
      var svcStat = false
      switch(svc) {
        case 'localMongo':
          svcStat = $scope.localMongoStatus;
          break;
        case 'remoteMongo':
          svcStat = $scope.remoteMongoStatus;
          break;
      }
      if(svcStat && $scope.ddbCmdBar) {
        $http.post('/api/devdash/' + svc + '/command', {cmd: $scope.ddbCmdBar}).then(function(res) {
          $scope.ddbCmdBar = '';
        });
      }
      else return false;
    }
  }

  $scope.ddbConnect = function(svc) {
    $http.get('/api/devdash/' + svc + '/connect', {check: true}).then(function() {
      if(svc == 'localMongo') {
        $scope.ddbStreamWell += 'done!\n';
        $scope.localMongoStatus = true;
        $timeout(function() {$scope.ddbStream(svc);}, 500);
      }
      else if(svc == 'remoteMongo') {
        $scope.ddbStreamWell += 'done!\n';
        $scope.remoteMongoStatus = true;
        $timeout(function() {$scope.ddbStream(svc);}, 500);
      }
      else if(svc == 'azureStream') {
        $scope.ddbStreamWell += 'done!\n';
        $scope.azureStreamStatus = true;
        $timeout(function() {$scope.ddbStream(svc);}, 500);
      }
    });
  }

  $scope.ddbDisconnect = function(svc) {
    // $http.get('/api/devdash/' + svc + '/disconnect', {check: true}).then(function() {
      if(svc == 'localMongo') $scope.localMongoStatus = false;
      else if(svc == 'remoteMongo') $scope.remoteMongoStatus = false;
      else if(svc == 'azureStream') $scope.azureStreamStatus = false;
    // });
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
    if(typeof(EventSource) !== 'undefined') {
      var strmSource = new EventSource('/api/devdash/' + svc + '/stream');
      strmSource.addEventListener('message', function(event) {
        $scope.$apply(function() {
          var msg = JSON.parse(event.data);
          // Replace special characters
          msg = msg.replace(/\[0m/g, '');
          msg = msg.replace(/\[36m/g, '');
          // Strip out Unicode characters 
          msg = unescape(encodeURIComponent(msg));
          console.log(msg);
          $scope.ddbStreamWell += msg.trim() + '\n';
          $timeout(function() {
            var sw = document.getElementById('streamWell');
            sw.scrollTop = sw.scrollHeight;
          }, 50);
        });
      }, false);
      strmSource.addEventListener('error', function(err) {
        $scope.$apply(function() {
          $scope.ddbDisconnect(svc);
          $scope.ddbStreamWell += 'The stream for ' + svc + ' has been unexpectedly closed.\n';
        });
        strmSource.close();
      }, false);
    }
    else $scope.ddbStreamWell = 'This browser does not support streaming.\n';
  }
});