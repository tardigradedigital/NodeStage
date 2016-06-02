angular.module('stage').controller('stLoginCtrl', ['$scope', 'stIdentity', 'stTickerSvc', 'stAuth', '$location', function($scope, stIdentity, stTickerSvc, stAuth, $location) {
  $scope.identity = stIdentity;
  $scope.signin = function(username, password) {
    if(!username || !password || username.$invalid || password.$invalid) {
      if(!username || username.$invalid) { $(loginWidget.username).addClass('invalid'); }
      if(!password || password.$invalid) { $(loginWidget.password).addClass('invalid'); }
      stTickerSvc.error('Please enter a valid email address and password.');
      return false;  
    }
    else {
      stAuth.authenticateUser(username, password).then(function(success) {
        if(success) {
          var path = stIdentity.isAuthorized('admin') ? '/admin' : '/';
          stTickerSvc.notify('You have been successfully authenticated.');
          if($location.path('login')) { $location.path(path); }
          if(stIdentity.isAuthorized('admin')) { $location.path(path); }
        }
        else { stTickerSvc.error('Invalid email address or password was given.') }
      });      
    }
  }
  
  $scope.signout = function() {
    stAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      stTickerSvc.notify('You have been signed out.');
      $location.path('/');
    })
  }
}])