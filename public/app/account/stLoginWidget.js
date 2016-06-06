angular.module('stage').directive('stLoginWidget', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/partials/account/views/login-widget'
  };
});