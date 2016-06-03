angular.module('stage', ['ngResource', 'ngRoute', 'ui.gravatar', 'ngAnimate']);

angular.module('stage').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: { auth: function(stAuth) { return stAuth.authorizeCurrentUserForRoute('admin'); } },
    user: { auth: function(stAuth) { return stAuth.authorizeAuthenticatedUserForRoute(); } },
    guest: { auth: function(stAuth) { return stAuth.unauthenticatedUser(); } }
  }
  
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { 
      templateUrl: '/partials/main/main', 
      controller: 'stMainCtrl'
    })
    .when('/admin', {
      templateUrl: '/partials/admin/views/admin', 
      controller: 'stAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/add', {
      templateUrl: '/partials/admin/views/add-user', 
      controller: 'stAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/delete', {
      templateUrl: '/partials/admin/views/delete-user', 
      controller: 'stAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/purge', {
      templateUrl: '/partials/admin/views/purge-users', 
      controller: 'stAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/sync', {
      templateUrl: '/partials/admin/views/sync-users', 
      controller: 'stAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/login', {
      templateUrl: '/partials/account/views/login', 
      controller: 'stLoginCtrl',
      resolve: routeRoleChecks.guest
    })
    .when('/signup', {
      templateUrl: '/partials/account/views/signup', 
      controller: 'stSignupCtrl',
      resolve: routeRoleChecks.guest
    })
    .when('/settings', {
      templateUrl: '/partials/account/views/settings', 
      controller: 'stProfileCtrl',
      resolve: routeRoleChecks.user
    })
    .otherwise({
      redirectTo: '/'
    });
});

angular.module('stage').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
});