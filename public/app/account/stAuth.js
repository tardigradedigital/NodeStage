angular.module('stage').factory('stAuth', function($http, $q, stIdentity, stUser) {
  return {
    // authenticateUser: Verifies login credentials and signs in user
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
    
    // createUser: Creates a new user
    createUser: function(newUserData) {
      var newUser = new stUser(newUserData);
      var dfd = $q.defer();
      
      newUser.$save().then(function() {
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      })
      
      return dfd.promise;
    },
    
    // logoutUser: Ends the current user's session
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function() {
        stIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    
    //purgeUsers: Removes all users and restores user database to defaults
    purgeUsers: function() {
      var dfd = $q.defer();
      $http({
        method: 'PURGE',
        url: '/api/users'
      }).then(function() {
        console.log('User database has been purged');
        dfd.resolve();
      });
      return dfd.promise;
    },
    
    // updateCurrentUser: Updates profile of current user
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
    
    // authorizeAuthenticatedUserForRoute: Checks whether user is signed in
    authorizeAuthenticatedUserForRoute: function() {
      if(stIdentity.isAuthenticated()) { return true; }
      else { return $q.reject('not authorized'); }
    },
    
    // authorizeCurrentUserForRoute: Checks whether curent user has role
    authorizeCurrentUserForRoute: function(role) {
      if(stIdentity.isAuthorized(role)) { return true; }
      else { return $q.reject('not authorized'); }
    },
    
    // unauthenticatedUser: Checks whether user is not signed in
    unauthenticatedUser: function() {
      if(!stIdentity.isAuthenticated()) { return true; }
      else { return $q.reject('user signed in'); }
    }
  }
});