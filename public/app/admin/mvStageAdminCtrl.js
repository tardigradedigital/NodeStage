angular.module('app').controller('mvStageAdminCtrl', function($scope, mvUser) {
  $scope.users = mvUser.query();
});