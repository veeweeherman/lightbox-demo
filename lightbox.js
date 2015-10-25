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

// var i = -1;
// function updateImgB(){
//   if (i >= quizImagesB.length) {i = -1;}
//   i += 1;
//   console.log(i)
//   var url = 'url(' + quizImagesB[i] + ')';
//
//   document.getElementById('pkmnImg').style.backgroundImage=url;
//  }

/********************** using raw xml to GET photos *************************/
// https://mathiasbynens.be/notes/xhr-responsetype-json


var respData = null;
  var flickrPhotos = [];
var getJSON = function(tag) {
  var query = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d7b5799416ae2ea346791364f3d8bd7c&tags='"+tag+"'&format=json&per_page=4&nojsoncallback=?"
  console.log('the query is: ',query);
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', query, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  }).then(function(data) {
    respData = data;
    console.log('respData: ',respData);
  }, function(status) {
    console.log('There was an error.......',status);
  }).then(function(){
    var photosArr = respData.photos.photo;
    for (var i = 0; i < photosArr.length; i++) {
      var photoURL = "https://farm" +
      photosArr[i].farm +".static.flickr.com/"+
      photosArr[i].server +"/"+
      photosArr[i].id +"_"+
      photosArr[i].secret +".jpg";
      flickrPhotos.push(photoURL);
    };
    console.log(flickrPhotos);


  });
};


var i = -1;
function updateImgB(){
  if (i >= flickrPhotos.length) {i = -1;}
  i += 1;
  console.log('incrementing',i);
  var url = 'url(' + flickrPhotos[i] + ')';

  document.getElementById('pkmnImg').style.backgroundImage=url;
 }

function prev(){
  if (i <= -1) {i = flickrPhotos.length;}
  i -= 1;
  console.log('decrementing',i);
  var url = 'url(' + flickrPhotos[i] + ')';

  document.getElementById('pkmnImg').style.backgroundImage=url;
}
// usersTags === the text the user input in the form

// var makeFlickrRequestURL = function(something){
//   return new Promise(function(resolve, reject) {
//       if (something) {
//         console.log('success in new promise')
//         resolve('there is something!');
//       } else {
//         console.log('error in side make flickr url promise')
//         reject(something);
//       }
//   });
//   url =  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d7b5799416ae2ea346791364f3d8bd7c&tags='"+ usersTags + "'&format=json&per_page=10&nojsoncallback=?";


// makeFlickrRequestURL('whhyyyyyyy').then(
  // getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d7b5799416ae2ea346791364f3d8bd7c&tags='cats'&format=json&per_page=10&nojsoncallback=?").then(function(data) {
  //   respData = data;
  //   console.log('respData: ',respData);
  // }, function(status) {
  //   console.log('There was an error.......',status);
  // }).then(function(){console.log('end of promise!!!!',respData)});


// var photosArr = respData.photos.photo;
// for (var i = 0; i < photosArr.length; i++) {
// // string concat of the url link
//   var url = "https://farm" +
//   flickrPhotos[i].farm +".static.flickr.com/"+
//   flickrPhotos[i].server +"/"+
//   flickrPhotos[i].id +"_"+
//   flickrPhotos[i].secret +".jpg";
//   flickrPhotos.push(url);
// };
