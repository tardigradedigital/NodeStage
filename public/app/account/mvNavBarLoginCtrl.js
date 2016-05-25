angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
  $scope.identity = mvIdentity;
  $scope.signin = function(username, password) {
    console.log(username);
    if(!username || !password || username.$invalid || password.$invalid) {
      if(!username || username.$invalid) { $(navLogin.username).addClass('invalid'); }
      if(!password || password.$invalid) { $(navLogin.password).addClass('invalid'); }
      mvNotifier.error('Please enter a valid email address and password.');
      return false;  
    }
    else {
      mvAuth.authenticateUser(username, password).then(function(success) {
        if(success) { 
          mvNotifier.notify('You have been successfully authenticated.');
          if($location.path('login')) { $location.path('/'); }
        }
        else { mvNotifier.error('Invalid email address or password was given.') }
      });      
    }
  }
  
  $scope.signout = function() {
    mvAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      mvNotifier.notify('You have been signed out.');
      $location.path('/');
    })
  }
})