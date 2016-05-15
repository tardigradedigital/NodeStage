(function() {
  function stageBg(last) {
    var img = [1, 2, 3, 4, 5];
    var rndm = img[Math.floor(Math.random() * img.length)];
    if(rndm == last) stageBg(last);
    $('body').animate({backgroundColor: 'rgba(35,35,35,1)'}, 200)
    $('<img/>').attr('src', '/img/background-' + rndm + '.jpg').load(function() {
      $(this).remove();
      $('html').css({'background-image': 'url(/img/background-' + rndm + '.jpg)'});
      setTimeout(function() {$('body').animate({backgroundColor: 'rgba(35,35,35,0.5)'}, 500);}, 400);
    });
    setInterval(stageBg, 5000, rndm);
  }
  stageBg();
})();