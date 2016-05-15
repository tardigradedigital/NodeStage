(function() {
  break;
  var il = [];
  var ic = 5;
  
  for(i = 1; i <= ic; i++) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var c = document.createElement('CANVAS');
      var ctx = c.getContext('2d');
      var data;
      c.height = this.height;
      c.width = this.width;
      ctx.drawImage(this, 0, 0);
      data = c.toDataURL();
      il.push(data);
      c = null
    }
    img.src = '/img/background-' + i + '.jpg';
    img.remove();
  }
  
  function stageBg(last) {
    var img = [1, 2, 3, 4, 5];
    var rndm = img[Math.floor(Math.random() * img.length)];
    if(rndm === last) { stageBg(last); }
    else {
      $('body').animate({backgroundColor: '#242424'}, 200)
      $('html').css({'background-image': il[rndm]});
      setTimeout(function() {$('body').animate({backgroundColor: 'rgba(35,35,35,0.5)'}, 500);}, 400);
      setTimeout(stageBg, 15000, rndm);
    }
  }
  //stageBg();
})();