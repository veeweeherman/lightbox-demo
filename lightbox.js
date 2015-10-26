// var activateLightBox = function(){
//   console.log(this);
//   var lbBG = document.getElementById('lightBoxBG');
//   // var lb = document.getElementById('displayPhotos');
//
//   // var lb = document.getElementById('lightBox');
//   lbBG.insertBefore(this,endOflb)
//   lbBG.style.display = "block";
//   // lb.style.display = "block";
// };
//
// var closeLightBox = function() {
//   var lbBG = document.getElementById('lightBoxBG');
//   var lb = document.getElementById('displayPhotos');
//
//   lbBG[0].style.display = "none";
//   // lb.style.display = "none";
// };



/********************** using raw xml to GET photos *************************/
// https://mathiasbynens.be/notes/xhr-responsetype-json
var testFunc = function() {console.log(this);}

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
    }; //<img src="kenya.jpg" alt="" />
    console.log(flickrPhotos);


  }).then(function(){
    // takes URLs from flickrPhotos array and assigns to an img src
    var thumbnails = document.getElementById('thumbnails');
    var lbContainer = document.getElementById('lbContainer');
    for (var i = 0; i < flickrPhotos.length; i++) {
      // for making <a href> and <img src> for each photo thumbnail
      var thumbnailAtag = document.createElement("a");
      thumbnailAtag.href = "#img" + (i+1);
      var thumbnailImage = document.createElement("img");
      // thumbnailImage.class = "thumbs";
      thumbnailImage.setAttribute('class','thumbs');
      thumbnailImage.src = flickrPhotos[i];
      thumbnailAtag.appendChild(thumbnailImage);
      console.log(thumbnailAtag);
      thumbnails.insertBefore(thumbnailAtag,endThumbnails)
      // for make <a href> and <img src> for each photo in the lbContainer
      var lbAtag = document.createElement("a");
      lbAtag.href = "#_";
      // lbAtag.class = "lightbox";
      lbAtag.setAttribute('class','lightbox');
      lbAtag.id = "img" + (i+1);
      var image = document.createElement("img");
      // image.class = "currentLBphoto";
      image.setAttribute('class','currentLBphoto');
      image.src = flickrPhotos[i];
      lbAtag.appendChild(image);
      // console.log(lbAtag);
      lbContainer.insertBefore(lbAtag,endlbContainer)

    }




  });
};


var i = -1;
function next(){
  if (i >= flickrPhotos.length) {i = -1;}
  i += 1;
  console.log('incrementing',i);
  var url = 'url(' + flickrPhotos[i] + ')';

  document.getElementById('prevnext').style.backgroundImage=url;
 }

function prev(){
  if (i <= -1) {i = flickrPhotos.length;}
  i -= 1;
  console.log('decrementing',i);
  var url = 'url(' + flickrPhotos[i] + ')';

  document.getElementById('prevnext').style.backgroundImage=url;
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
