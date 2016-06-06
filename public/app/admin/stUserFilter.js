angular.module('stage').filter('userfind', function() {
  return function(users, q) {
    var matched = [];
    angular.forEach(users, function(u) {
      try { var exp = new RegExp(q, 'gi'); } catch(e) { return []; }
      if(u.userName.match(exp) || u.firstName.match(exp) || u.lastName.match(exp) || q == '') {
        matched.push({
          _id: u._id, 
          userName: u.userName, 
          firstName: u.firstName, 
          lastName: u.lastName,
          roles: u.roles
        })
      }
    });
    return matched;
  }
});