angular.module('stage').controller('stAdminCtrl', function($scope, $timeout, stAdminSvc, stAdminUserSvc, stAuthSvc, stTickerSvc) {
  $scope.env = stAdminSvc.whatEnv();
  $scope.users = stAdminUserSvc.populateUsers();
  $scope.userRes = $scope.users;
  $scope.userField = 'userName';
  $scope.userReverse = false;
  $scope.userCurrentPage = 0;
  $scope.userShowOnPage = '10';
  $scope.userSyncEnabled = $scope.env == 'development' ? true : false;
  $scope.userSyncDir = 'toloc';

  $scope.filterUsers = function() {
    $scope.userRes = [];
    var res = stAdminUserSvc.searchUsers($scope.users, $scope.userSearch);
    $scope.userRes = res;
    $scope.userCurrentPage = 0;
  }

  $scope.sortUsers = function(field, invert) {
    $scope.userReverse = ($scope.userField === field ? !$scope.userReverse : false);
    if(invert) { $scope.userReverse = ($scope.userField === field ? $scope.userReverse : true); }
    $scope.userField = field;
  }
  
  $scope.createUser = function() {
    var newUserData = {
      userName: $scope.email,
      password: $scope.password,
      firstName: $scope.firstName,
      lastName: $scope.lastName
    };
    
    stAuthSvc.createUser(newUserData).then(
      function() { stTickerSvc.notify('Created user account ' + newUserData.userName +  '.'); stAdminSvc.adminRedirect('/admin'); }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
  
  $scope.purgeUsers = function() {
    stAdminSvc.adminRedirect('/admin');
    stAdminSvc.updateRoot('userPurgeInProgress', true);
    $timeout(function() {
      stAuthSvc.purgeUsers().then(
        function() {
            stAdminSvc.adminRedirect('/');
            stAuthSvc.logoutUser().then(
            function() { $timeout($scope.purgeDone, 5000); },
            function(reason) { 
              stTickerSvc.error(reason);
              stAdminSvc.updateRoot('userPurgeInProgress', false);
            }
          );
        }, 
        function(reason) { stTickerSvc.error(reason); $timeout($scope.purgeDone, 5000); }
      );
    }, 5000);
  }
  
  $scope.syncDb = function(collection, syncDir) {
    if(collection == 'users') {
      stAdminSvc.adminRedirect('/admin');
      stAdminSvc.updateRoot('userSyncInProgress', true);
      stAuthSvc.syncUsers(syncDir).then(
        function() {
          if(syncDir == 'toloc') {
            stAdminSvc.adminRedirect('/');
            stAuthSvc.logoutUser().then(
              function() { $timeout($scope.syncDone, 5000); },
              function(reason) {
                stTickerSvc.error(reason);
                stAdminSvc.updateRoot('userSyncInProgress', true);
              }
            );
          }
          else { $timeout($scope.syncDone, 5000); }
       },
        function(reason) { stTickerSvc.error(reason); $timeout($scope.syncDone, 5000); }
      );
    }
  }
  
  $scope.pageUsers = function() {
    return Math.ceil($scope.userRes.length/$scope.userShowOnPage);
  }
  
  $scope.purgeDone = function() {
    stTickerSvc.notify('User database has been purged.'); 
    stAdminSvc.updateRoot('userPurgeInProgress', false);
  }
  
  $scope.syncDone = function() {
    stTickerSvc.notify('User database has been synced.'); 
    stAdminSvc.updateRoot('userSyncInProgress', true);
  }
});