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


var quizImagesB = ["kenya.jpg", "istanbul.jpg", "greece.png", "malawi.gif"];

var i = -1;
function updateImgB(){
  if (i > quizImagesB.length-1) {i = -1;}
  i += 1;
  console.log(i)
  var url = 'url(' + quizImagesB[i] + ')';

  document.getElementById('pkmnImg').style.backgroundImage=url;
 }
