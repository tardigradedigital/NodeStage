angular.module('stage').controller('mvSignupCtrl', ['$scope', 'stAuth', '$location', 'stTickerSvc', function($scope, stAuth, $location, stTickerSvc) {
  $scope.signup = function() {
    var newUserData = {
      userName: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };
    
    stAuth.createUser(newUserData).then(
      function() { stTickerSvc.notify('User account created.'); $location.path('/'); }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
}]);