angular.module('stage').factory('stAdminUserSvc', function($filter, stUserSvc) {
  return {
    actionDone: function(act) {
      switch(act) {
        case 'purge':
          var actVerb = 'purged'
          $rootScope.userPurgeInProgress = false;
          break;
        case 'sync':
          var actVerb = 'synced'
          $rootScope.userSyncInProgress = false;
          break;
      }
      if(actVerb) {stTickerSvc.notify('User database has been ' + actVerb + '.'); }
    },
    populateUsers: function() {
      return stUserSvc.query();
    },
    searchUsers: function(users, query) {
      return $filter('userfind')(users, query);
    }
  };
});