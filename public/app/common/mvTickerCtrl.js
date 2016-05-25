angular.module('app').controller('mvTickerCtrl', function($scope, mvNotifier) {
  $scope.custom = mvNotifier.custom();
  $scope.reset = mvNotifier.reset();
  $scope.showAll = function() {
    console.log('Ticker toggled');
    $('.ticker-container').toggleClass('expanded');
  }
});