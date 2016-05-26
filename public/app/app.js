angular.module('app', ['ngResource', 'ngRoute', 'ui.gravatar', 'ngAnimate']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: {
      auth: function(mvAuth) { return mvAuth.authorizeCurrentUserForRoute('admin'); }
    },
    user: {
      auth: function(mvAuth) { return mvAuth.authorizeAuthenticatedUserForRoute(); }
    },
    guest: {
      auth: function(mvAuth) { return mvAuth.unauthenticatedUser(); }
    }
  }
  
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { 
      templateUrl: '/partials/main/main', 
      controller: 'mvMainCtrl'
    })
    .when('/admin', {
      templateUrl: '/partials/admin/admin', 
      controller: 'mvStageAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/add', {
      templateUrl: '/partials/admin/users/add', 
      controller: 'mvStageAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/delete', {
      templateUrl: '/partials/admin/users/delete', 
      controller: 'mvStageAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/admin/users/purge', {
      templateUrl: '/partials/admin/users/purge', 
      controller: 'mvStageAdminCtrl', 
      resolve: routeRoleChecks.admin
    })
    .when('/login', {
      templateUrl: '/partials/account/login', 
      controller: 'mvNavBarLoginCtrl',
      resolve: routeRoleChecks.guest
    })
    .when('/signup', {
      templateUrl: '/partials/account/signup', 
      controller: 'mvSignupCtrl',
      resolve: routeRoleChecks.guest
    })
    .when('/settings', {
      templateUrl: '/partials/account/settings', 
      controller: 'mvProfileCtrl',
      resolve: routeRoleChecks.user
    });
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if(rejection === 'not authorized') {
      $location.path('/');
    }
  })
});