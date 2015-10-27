// using XML to GET photos using Flickr API
var respData = null;
var flickrPhotos = [];

// TODO:
  // add options for user to specify how many photos would s/he like to be returned with drop down menu
  // add title to each photo to display in lightbox
  // have thumbnails section empty and repopulate when user searches new keyword (as opposed to searching a new keyword and the new thumbnails are appended to page after previous thumbnails)
  // combine last two promises we don't have to iterate through results twice
var getJSON = function(tag) {

  var query = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d7b5799416ae2ea346791364f3d8bd7c&tags='"+tag+"'&format=json&per_page=50&nojsoncallback=?"

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
    // concatenates values from each image to create the image's URL as a string
    // code from my previous FLickr photo project :)
      // https://github.com/veeweeherman/tinpurr
    var photosArr = respData.photos.photo;
    for (var i = 0; i < photosArr.length; i++) {
      var photoURL = "https://farm" +
      photosArr[i].farm +".static.flickr.com/"+
      photosArr[i].server +"/"+
      photosArr[i].id +"_"+
      photosArr[i].secret +".jpg";
      flickrPhotos.push(photoURL);
    }
  }).then(function(){
    var thumbnails = document.getElementById('thumbnails');
    var lbContainer = document.getElementById('lbContainer');
    for (var i = 0; i < flickrPhotos.length; i++) {
      // Create and display thumbnails
      var thumbnailAtag = document.createElement("a");
      thumbnailAtag.href = "#img" + (i+1);
      var thumbnailImage = document.createElement("img");
      thumbnailImage.setAttribute('class','thumbs');
      thumbnailImage.src = flickrPhotos[i];
      thumbnailAtag.appendChild(thumbnailImage);
      thumbnails.insertBefore(thumbnailAtag,endThumbnails);

      // Create each image that can be hidden/displayed in the lightbox
      var lbAtag = document.createElement("a");
      lbAtag.href = "#_";
      lbAtag.setAttribute('class','lightbox');
      lbAtag.id = "img" + (i+1);
      var image = document.createElement("img");
      image.setAttribute('class','currentLBphoto');
      image.src = flickrPhotos[i];
      lbAtag.appendChild(image);
      lbContainer.insertBefore(lbAtag,endlbContainer);
    }
  });
};



// TODO: add prev/next button functionality so user can go back or jump ahead to next photo
  // use each image's index that it is associated with in the array of all images, increment and decrement the index by click prev/next
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
