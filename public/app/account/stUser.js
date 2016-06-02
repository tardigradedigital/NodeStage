angular.module('stage').factory('stUser', function($resource) {
  var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
    update: {method: 'PUT', isArray: false},
    purge: {method: 'PURGE', isArray: false}
  });
  
  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }
  
  return UserResource;
})