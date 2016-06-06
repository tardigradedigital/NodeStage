angular.module('stage').controller('stAdminCtrl', function($scope, $filter, $location, $timeout, $rootScope, stAuth, stTickerSvc, stUser) {
  $scope.users = stUser.query();
  $scope.userRes = $scope.users;
  $scope.userField = 'userName';
  $scope.userReverse = false;
  $scope.userCurrentPage = 0;
  $scope.userShowOnPage = '10';
  $scope.userSyncEnabled = window.env == 'development' ? true : false;
  $scope.userSyncDir = 'toloc';

  $scope.filterUsers = function() {
    $scope.userRes = [];
    var res = $filter('userfind')($scope.users, $scope.userSearch);
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
    
    stAuth.createUser(newUserData).then(
      function() { stTickerSvc.notify('Created user account ' + newUserData.userName +  '.'); $location.path('/admin'); }, 
      function(reason) { stTickerSvc.error(reason); }
    );
  }
  
  $scope.purgeUsers = function() {
    $location.path('/admin');
    $rootScope.userPurgeInProgress = true;
    $timeout(function() {
      stAuth.purgeUsers().then(
        function() {
            $location.path('/');
            stAuth.logoutUser().then(
            function() { $timeout($scope.purgeDone, 5000); },
            function(reason) { 
              stTickerSvc.error(reason);
              $rootScope.userPurgeInProgress = false;
            }
          );
        }, 
        function(reason) { stTickerSvc.error(reason); $timeout($scope.purgeDone, 5000); }
      );
    }, 5000);
  }
  
  $scope.syncDb = function(collection, syncDir) {
    if(collection == 'users') {
      $location.path('/admin');
      $rootScope.userSyncInProgress = true;
      stAuth.syncUsers(syncDir).then(
        function() {
          if(syncDir == 'toloc') {
            $location.path('/');
            stAuth.logoutUser().then(
              function() { $timeout($scope.syncDone, 5000); },
              function(reason) {
                stTickerSvc.error(reason);
                $rootScope.userSyncInProgress = false;
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
    $rootScope.userPurgeInProgress = false;
  }
  
  $scope.syncDone = function() {
    stTickerSvc.notify('User database has been synced.'); 
    $rootScope.userSyncInProgress = false;
  }
});