angular.module('app').factory('mvNotifier', function() {
  var icon = IconicJS();
  
  return {
    notify: function(msg) {
      var msgel = $('<span></span>').html(' ' + msg).prepend($('<span></span>').addClass('iconic iconic-sm iconic-check-thin')).addClass('success');
      icon.inject('#ticker');
      $('#ticker').addClass('on').prepend(msgel);
      setTimeout(function() {$('#ticker').removeClass('on');}, 300);
    },
    
    error: function(msg) {
      var msgel = $('<span></span>').html(' ' + msg).prepend($('<span></span>').addClass('iconic iconic-sm iconic-x-thin')).addClass('error');
      icon.inject('#ticker');
      $('#ticker').addClass('on').prepend(msgel);
      setTimeout(function() {$('#ticker').removeClass('on');}, 300);
    },
    
    info: function(msg) {
      var msgel = $('<span></span>').html(' ' + msg).prepend($('<span></span>').addClass('iconic iconic-sm iconic-info'));
      icon.inject('#ticker');
      $('#ticker').addClass('on').prepend(msgel);
      setTimeout(function() {$('#ticker').removeClass('on');}, 300);
    }
  }
});