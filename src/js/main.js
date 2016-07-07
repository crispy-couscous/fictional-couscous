import $ from 'jquery';
import {flickrToken} from './credentials.js';
var foodNode = $(".foodPics");

var menu = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/menu/1'
}).then(function(response) {
  console.log(response);
})

var news = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/news/1'
}).then(function(response) {
  console.log(response);
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
