import $ from 'jquery';

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