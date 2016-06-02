angular.module('stage').controller('stAdminCtrl', ['$scope', '$location', 'stAuth', 'stTickerSvc', 'stUser', function($scope, $location, stAuth, stTickerSvc, stUser) {
  $scope.users = stUser.query();
  $scope.field = 'userName';
  $scope.reverse = false;
  
  $scope.sortUsers = function(field, invert = false) {
    $scope.reverse = ($scope.field === field ? !$scope.reverse : false);
    if(invert) { $scope.reverse = ($scope.field === field ? $scope.reverse : true); }
    $scope.field = field;
  }
  
  $scope.createUser = function() {
    var newUserData = {
      userName: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };
    
    stAuth.createUser(newUserData).then(
      function() { stTickerSvc.notify('User account created.'); $location.path('/admin'); }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
  
  $scope.purgeUsers = function() {
    stAuth.purgeUsers().then(
      function() {
        stTickerSvc.notify('User database has been purged.');
        stAuth.logoutUser().then(
          function() { $location.path('/'); },
          function(reason) { stTickerSvc.error(reason); }
        );
      }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
}]);