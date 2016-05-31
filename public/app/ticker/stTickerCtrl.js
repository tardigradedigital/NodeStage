angular.module('stage').controller('stTickerCtrl', ['$scope', 'stTickerSvc', function($scope, stTickerSvc) {
  $scope.custom = stTickerSvc.custom();
  $scope.reset = stTickerSvc.reset();
  $scope.showAll = function() { $('.ticker-container').toggleClass('expanded'); }
}]);