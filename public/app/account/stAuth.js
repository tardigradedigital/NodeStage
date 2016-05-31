angular.module('stage').factory('stAuth', function($http, stIdentity, $q, stUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new stUser();
          delete response.data.user['hashed_pwd'];
          delete response.data.user['salt'];
          angular.extend(user, response.data.user);
          stIdentity.currentUser = user;
          dfd.resolve(true);
        }
        else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    
    createUser: function(newUserData) {
      var newUser = new stUser(newUserData);
      var dfd = $q.defer();
      
      newUser.$save().then(function() {
        stIdentity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      })
      
      return dfd.promise;
    },
    
    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();
      
      var clone = angular.copy(stIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        stIdentity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function() {
        stIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    
    authorizeCurrentUserForRoute: function(role) {
      if(stIdentity.isAuthorized('admin')) { return true; }
      else { return $q.reject('not authorized'); }
    },
    
    authorizeAuthenticatedUserForRoute: function() {
      if(stIdentity.isAuthenticated()) { return true; }
      else { return $q.reject('not authorized'); }
    },
    
    unauthenticatedUser: function() {
      if(!stIdentity.isAuthenticated()) { return true; }
      else { return $q.reject('user signed in'); }
    }
  }
});