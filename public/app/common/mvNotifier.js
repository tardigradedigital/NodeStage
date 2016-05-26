angular.module('app').factory('mvNotifier', function() {
  var ftr = '//tardigrade/node | Tardigrade Digital &copy; 2016';
  var toset = false;
  var to = null;
  
  function addTicker(msg, lvl, ic) {
    msg = lvl ? (' ' + msg) : msg;
    var msgobj = $('<span></span>').addClass('ticker-msg').html(msg);
    if(ic) { 
      ic = $('<span></span>').addClass('iconic iconic-sm ' + ic); 
      msgobj.prepend(ic); 
    }
    if(lvl) { msgobj.addClass(lvl); }
    $('#ticker').addClass('on').prepend(msgobj);
    setTimeout(function() {$('#ticker').removeClass('on');}, 300);
    if(!toset) { toset = true; to = setTimeout(function() { resetTicker(); toset = false; }, 8000); }
    else {
      clearTimeout(to);
      to = setTimeout(function() { resetTicker(); toset = false; }, 8000);
    }
  }
  
  function resetTicker() {
    $('#ticker #ftrmsg').remove();
    var msgobj = $('<span></span>').html(ftr).attr('id', 'ftrmsg');
    $('#ticker').addClass('on').prepend(msgobj);
    setTimeout(function() {$('#ticker').removeClass('on');}, 300);
  }
  
  return {
    custom: function(msg, lvl, ic) { if(!msg) { return false; }; addTicker(msg, lvl, ('iconic-' + ic)); },
    notify: function(msg) { if(!msg) { return false; }; addTicker(msg, 'success', 'iconic-check-thin'); },
    error: function(msg) { if(!msg) { return false; }; addTicker(msg, 'error', 'iconic-x-thin'); },
    info: function(msg) { if(!msg) { return false; }; addTicker(msg, null, 'iconic-info'); },
    reset: function() { resetTicker(); }
  }
});