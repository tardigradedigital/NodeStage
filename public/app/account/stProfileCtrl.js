angular.module('stage').controller('stProfileCtrl', ['$scope', 'stAuth', 'stIdentity', 'stTickerSvc', function($scope, stAuth, stIdentity, stTickerSvc) {
  $scope.email = stIdentity.currentUser.userName;
  $scope.fname = stIdentity.currentUser.firstName;
  $scope.lname = stIdentity.currentUser.lastName;
  
  $scope.update = function() {
    var newUserData = {
      userName: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    }
    
    if($scope.password && $scope.password.length > 0) { newUserData.password = $scope.password; }
    
    stAuth.updateCurrentUser(newUserData).then(
      function() { stTickerSvc.notify('Your profile has been updated.') }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
}])