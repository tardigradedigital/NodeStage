angular.module('stage').controller('stProfileCtrl', function($scope, stAuthSvc, stIdentitySvc, stTickerSvc) {
  $scope.email = stIdentitySvc.currentUser.userName;
  $scope.firstName = stIdentitySvc.currentUser.firstName;
  $scope.lastName = stIdentitySvc.currentUser.lastName;
  
  $scope.update = function() {
    var newUserData = {
      userName: $scope.email,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    }

    if($scope.password && $scope.password.length > 0) { newUserData.password = $scope.password; }

    stAuthSvc.updateCurrentUser(newUserData).then(
      function() { stTickerSvc.notify('Your profile has been updated.') }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
});