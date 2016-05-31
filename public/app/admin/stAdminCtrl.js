angular.module('stage').controller('stAdminCtrl', ['$scope', 'stUser', function($scope, stUser) {
  $scope.users = stUser.query();
}]);