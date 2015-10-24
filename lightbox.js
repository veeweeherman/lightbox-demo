var activateLightBox = function(){
  var lbBG = document.getElementsByClassName('lightBoxBG');
  var lb = document.getElementsByClassName('lightBox');

  lbBG[0].style.display = "block";
  lb[0].style.display = "block";
};

var closeLightBox = function() {
  var lbBG = document.getElementsByClassName('lightBoxBG');
  var lb = document.getElementsByClassName('lightBox');

  lbBG[0].style.display = "none";
  lb[0].style.display = "none";
};
