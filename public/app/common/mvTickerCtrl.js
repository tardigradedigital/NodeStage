angular.module('app').controller('mvTickerCtrl', function($scope, mvNotifier) {
  $scope.custom = mvNotifier.custom();
  $scope.reset = mvNotifier.reset();
  $scope.showAll = function() {
    alert('Show Ticker');
  }
});