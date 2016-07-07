import $ from 'jquery';
import {flickrToken} from './credentials.js';
var foodNode = $(".foodPics");

function newsTmpl(data) {
  var template = `
      ${data.title}`
  $('.newsContent').html(template)
}

function appetizersTmpl (data) {
  var template =`
  <ul><li>${data.item}</li></ul>${data.description}`
  $('.appetizers').append(template)
}
function entreesTmpl (data) {
  var template =`
  <ul><li>${data.item}</li></ul>${data.description}`
  $('.entrees').append(template)
}
function sidesTmpl (data) {
  var template =`
  <ul><li>${data.item}</li></ul>${data.description}`
  $('.sides').append(template)
}

var menu = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/menu/1'
}).then(function(response) {
  console.log(response);
  response.appetizers.forEach(appetizersTmpl)
  response.entrees.forEach(entreesTmpl)
  response.sides.forEach(sidesTmpl)

})

var news = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/news/1'
}).then(function(response) {
  console.log(response.title);
  var template = `
        <div class="newsTitle">
          ${response.title} ${response.date_published}
        </div>
        <div class="newsPost">
          <p>${response.post}</p>
        </div>`
  $('.newsContent').append(template)
})

$('#tabStory').on("click", function(event) {
  event.preventDefault();
})
$('#tabMenu').on("click", function(event) {
  event.preventDefault();
})
$('#tabReservation').on("click", function(event) {
  event.preventDefault();
})


function createFlickrTmpl(foodItem) {
  var item = foodItem;
  return `<img class="food-pic" src="https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg">`;
};

var foodPictures = $.ajax({
  url: `https://api.flickr.com/services/rest/`,
  data: {
    method: "flickr.photos.search",
    format: "json",
    nojsoncallback: "1",
    tags: "couscous",
    per_page: "5",
    api_key: flickrToken
  }
}).then(function(data){
  console.log(data);
  var foodItem = data.photos.photo.map(createFlickrTmpl);
  console.log(foodItem);
  console.log(foodNode);
  foodNode.append(foodItem);
});
