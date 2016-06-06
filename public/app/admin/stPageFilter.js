angular.module('stage').filter('userStartPage', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});