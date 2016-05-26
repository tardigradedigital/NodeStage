$(document).ready(function () {
  // Fix for closing menu on mobile and ticker on destop and mobile when clicked or touched elsewhere on the page
  var checkMhd = function(event) {
    var clickover = $(event.target);
    var $navbar = $('.navbar-collapse');
    var $ticker = $('.ticker-container')               
    var _nopened = $navbar.hasClass('in');
    var _topened = $ticker.hasClass('expanded');
    if (_nopened === true && !clickover.hasClass('navbar-toggle')) { $navbar.collapse('hide'); }
    if (_topened === true && !clickover.hasClass('navbar-text') && !clickover.hasClass('ticker-container') && !clickover.hasClass('ticker-msg') && !(clickover.attr('id') === 'ftrmsg')) { $ticker.removeClass('expanded'); }
  }
  
  $('body').click(function(event) { checkMhd(event); });
});

// (function() {
//   var il = [];
//   var ic = 5;
  
//   for(i = 1; i <= ic; i++) {
//     var img = new Image();
//     img.crossOrigin = 'Anonymous';
//     img.onload = function() {
//       var c = document.createElement('CANVAS');
//       var ctx = c.getContext('2d');
//       var data;
//       c.height = this.height;
//       c.width = this.width;
//       ctx.drawImage(this, 0, 0);
//       data = c.toDataURL();
//       il.push(data);
//       c = null
//     }
//     img.src = '/img/background-' + i + '.jpg';
//     img.remove();
//   }
  
//   function stageBg(last) {
//     var img = [1, 2, 3, 4, 5];
//     var rndm = img[Math.floor(Math.random() * img.length)];
//     if(rndm === last) { stageBg(last); }
//     else {
//       $('body').animate({backgroundColor: '#242424'}, 200)
//       $('html').css({'background-image': il[rndm]});
//       setTimeout(function() {$('body').animate({backgroundColor: 'rgba(35,35,35,0.5)'}, 500);}, 400);
//       setTimeout(stageBg, 15000, rndm);
//     }
//   }
//   //stageBg();
// })();