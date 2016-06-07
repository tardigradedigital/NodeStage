angular.module('stage').controller('stLoginCtrl', function($scope, $location, stAuthSvc, stIdentitySvc, stTickerSvc) {
  $scope.identity = stIdentitySvc;
  $scope.signin = function(username, password) {
    if(!username || !password || username.$invalid || password.$invalid) {
      if(!username || username.$invalid) { $(loginWidget.username).addClass('invalid'); }
      if(!password || password.$invalid) { $(loginWidget.password).addClass('invalid'); }
      stTickerSvc.error('Please enter a valid email address and password.');
      return false;  
    }
    else {
      stAuthSvc.authenticateUser(username, password).then(function(success) {
        if(success) {
          username = '';
          password = '';
          $scope.username = '';
          $scope.password = '';
          var path = stIdentitySvc.isAuthorized('admin') ? '/admin' : '/';
          stTickerSvc.notify('You have been successfully authenticated.');
          if($location.path('login')) { $location.path(path); }
          if(stIdentitySvc.isAuthorized('admin')) { $location.path(path); }
        }
        else { stTickerSvc.error('Invalid email address or password was given.') }
      });      
    }
  }
  
  $scope.signout = function() {
    stAuthSvc.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      stTickerSvc.notify('You have been signed out.');
      $location.path('/');
    })
  }
});