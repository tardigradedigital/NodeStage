angular.module('stage').factory('stAdminSvc', function($location, $parse, $rootScope, $window) {
  return {
    adminRedirect: function(path) {
      $location.path(path);
    },
    updateRoot: function(obj, val) {
      var rootObj = $parse('$rootScope.' + obj);
      rootObj = val;
    },
    whatEnv: function() {
      return $window.env;
    }
  };
});