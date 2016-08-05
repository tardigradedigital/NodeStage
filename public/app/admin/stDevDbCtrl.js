angular.module('stage').controller('stDevDbCtrl', function($scope, $http, $interval, $timeout, stDevDbSvc) {
  $scope.currentSvc = {
    view: null,
    type: null,
    streamWell: ''
  }

  /*
    Consider removing the below heartbeat code as it floods the developer console network tab and the Node.JS
    log window. Possible to tie in the service to the event source polyfill to detect when an HTTP code other
    than 200 has been received.
  */

  $scope.svcStatus = {
    heartBeat: $interval(function() {
      var svcs = ['devMongo', 'cloudMongo', 'azureStream'];
      svcs.forEach(function(svc) {
        if($scope.svcStatus[svc] !== 'error') {
          stDevDbSvc.checkStatus(svc).then(
            function(stat) {
              if(stat.code) {
                $scope.svcStatus[svc] = 'error';
                console.log('A fatal connection error to ' + svc + ' has disrupted heartbeat services');
              }
              else $scope.svcStatus[svc] = stat;
            },
            function(error) { console.log(error); }
          );
        }
      });
    }, 500)
  }

  $scope.changeView = function(svc) {
    if(svc == 'overview') {
      $scope.currentSvc.view = null;
      $scope.currentSvc.type = null;
    }
    else {
      $scope.currentSvc.view = svc;
      $scope.currentSvc.type = stDevDbSvc.getConsoleType(svc);
      $scope.currentSvc.streamWell = stDevDbSvc.getStreamWell(svc);
      if(!$scope.svcStatus[svc]) $scope.connectService(svc);
    }
  }

  /*
    Currently if a streamwell is updated in the background, it will update the view window with the new message
    regardless if that view is active or not. This is especially seen with the Azure log stream if the cloud
    stage site is accessed or has been inactive for 60 seconds and the log stream service logs inactivity.
  */

  $scope.connectService = function(svc) {
    console.log('Connecting service ' + svc);
    stDevDbSvc.connectService(svc).then(
      function() {
        if(typeof(EventSource) !== 'undefined') {
          $scope.currentSvc.streamWell = stDevDbSvc.currentSvc.getStream();
          stDevDbSvc.currentSvc.eventSource = new EventSource(stDevDbSvc.currentSvc.endPoint + 'stream');
          stDevDbSvc.currentSvc.eventSource.addEventListener('message', function(event) {
            $scope.$apply(function() {
              $scope.currentSvc.streamWell = stDevDbSvc.updateStreamWell(event.data);
              $timeout(function() {
                var sw = document.getElementById('streamWell');
                sw.scrollTop = sw.scrollHeight;

              }, 50);
            });
          }, false);
          stDevDbSvc.currentSvc.eventSource.addEventListener('error', function(err) {
            $scope.$apply(function() {
              $scope.ddbDisconnect(svc);
              $scope.currentSvc.streamWell += 'The stream for ' + svc + ' has been unexpectedly closed.\n';
            });
            stDevDbSvc.currentSvc.eventSource.close();
          }, false);
        }
        else $scope.currentSvc.streamWell = 'This browser does not support streaming.\n';
    });
  }

  // Restructure needed
  $scope.ddbCommand = function() {
    var svc = $scope.currentSvc.view;
    console.log(svc);
    if($scope.currentSvc.type !== 'cmd') return false;
    else {
      console.log('Type is cmd');
      console.log($scope.ddbCmdBar);
      console.log($scope.checkStatus(svc));
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

  // $scope.ddbConnect = function(svc) {
  //   $http.get('/api/devdash/' + svc + '/connect', {check: true}).then(function() {
  //     if(svc == 'localMongo') {
  //       $scope.currentSvc.streamWell += 'done!\n';
  //       $scope.localMongoStatus = true;
  //       $timeout(function() {$scope.ddbStream(svc);}, 500);
  //     }
  //     else if(svc == 'remoteMongo') {
  //       $scope.currentSvc.streamWell += 'done!\n';
  //       $scope.remoteMongoStatus = true;
  //       $timeout(function() {$scope.ddbStream(svc);}, 500);
  //     }
  //     else if(svc == 'azureStream') {
  //       $scope.currentSvc.streamWell += 'done!\n';
  //       $scope.azureStreamStatus = true;
  //       $timeout(function() {$scope.ddbStream(svc);}, 500);
  //     }
  //   });
  // }

  // Restructure needed
  $scope.ddbDisconnect = function(svc) {
    // $http.get('/api/devdash/' + svc + '/disconnect', {check: true}).then(function() {
      if(svc == 'localMongo') $scope.localMongoStatus = false;
      else if(svc == 'remoteMongo') $scope.remoteMongoStatus = false;
      else if(svc == 'azureStream') $scope.azureStreamStatus = false;
    // });
  }

  $scope.checkStatus = function(svc) { return stDevDbSvc.checkStatus(svc); }

  // Restructure needed
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
          $scope.currentSvc.streamWell += msg.trim() + '\n';
          $timeout(function() {
            var sw = document.getElementById('streamWell');
            sw.scrollTop = sw.scrollHeight;
          }, 50);
        });
      }, false);
      strmSource.addEventListener('error', function(err) {
        $scope.$apply(function() {
          $scope.ddbDisconnect(svc);
          $scope.currentSvc.streamWell += 'The stream for ' + svc + ' has been unexpectedly closed.\n';
        });
        strmSource.close();
      }, false);
    }
    else $scope.currentSvc.streamWell = 'This browser does not support streaming.\n';
  }
});