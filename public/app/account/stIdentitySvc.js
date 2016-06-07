angular.module('stage').factory('stIdentitySvc', function($window, stUserSvc) {
  var currentUser;
  if($window.stageUser) { 
    currentUser = new stUserSvc();
    delete $window.stageUser['hashed_pwd'];
    delete $window.stageUser['salt'];
    angular.extend(currentUser, $window.stageUser);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() { return !!this.currentUser; },
    isAuthorized: function(role) { return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1; }
  }
});