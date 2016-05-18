angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
  $scope.identity = mvIdentity;
  $scope.signin = function(username, password) {
    mvAuth.authenticateUser(username, password).then(function(success) {
      if(success) { mvNotifier.notify('You have been successfully authenticated.') }
      else { mvNotifier.notify('Invalid credentials were specified.') }
    });
    if($location.path('login')) { $location.path('/'); }
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