import $ from 'jquery';
import {flickrToken} from './credentials.js';
var foodNode = $(".foodPics");

function newsTmpl(data) {
  var template = `
      ${data.title}`
  $('.newsContent').html(template)
};

function appetizersTmpl (data) {
  var template =`
  <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
  ${data.description}
  <div class="entreeInfo">

  <span class="entypo-alert"></span><span class="entypo-star"></span>
  <span class="entypo-flash"></span><span class="entypo-vimeo-circled"></span>
  </div>`
  $('.appetizers').append(template)
};

function entreesTmpl (data) {
  var template =`
  <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
  ${data.description}
  <div class="entreeInfo">

  <span class="entypo-alert"></span><span class="entypo-star"></span>
  <span class="entypo-flash"></span><span class="entypo-vimeo-circled"></span>
  </div>`
  $('.entrees').append(template)
};

function sidesTmpl (data) {
  var template =`
  <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
  ${data.description}
  <div class="entreeInfo">

  <span class="entypo-alert"></span><span class="entypo-star"></span>
  <span class="entypo-flash"></span><span class="entypo-vimeo-circled"></span>
  </div>`
  $('.sides').append(template)
};

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
  var template = `
    <div>
      <p>Black jack parrel grog blossom hardtack bowsprit Sink me clap of thunder crow's nest.
      Measured fer yer chains holystone reef carouser boom haul wind crimp Jack Tar.
      Galleon man-of-war bilge rat long boat booty maroon mizzen Arr. Jolly Roger walk the plank deadlights belay snow
      Brethren of the Coast strike colors run a rig. Spyglass six pounders bilge rat Admiral of the Black
      bounty Spanish Main execution dock plunder. Lanyard Buccaneer lookout knave starboard wherry clap of
      thunder tackle. Interloper hornswaggle careen marooned main sheet rope's end ye schooner.
      Provost Plate Fleet hail-shot hornswaggle tender fathom Jolly Roger starboard. Jack hulk scurvy mizzenmast
      Shiver me timbers dance the hempen jig parley spyglass. Crow's nest clap of thunder ballast ho capstan boatswain
      mizzenmast killick.</p><br>
      <img src="http://placecage.com/600/300"><br>
      <p>Rope's end Cat o'nine tails blow the man down doubloon spirits scuttle lee knave.
      Keel lee Letter of Marque bilge rat topgallant line furl blow the man down. Handsomely
      sloop execution dock cackle fruit driver code of conduct Sink me coxswain. Carouser chandler
      hail-shot keelhaul skysail Jolly Roger sutler rope's end. Bowsprit furl red ensign six
      pounders starboard brig gunwalls Spanish Main. Chain Shot chase guns schooner carouser
      nipperkin pink parrel gangway. Fathom pillage hardtack maroon killick Barbary Coast sutler
      scuttle. Dead men tell no tales Barbary Coast loaded to the gunwalls chantey brig bilge rat
      Sea Legs black spot. Grog grapple crack Jennys tea cup squiffy hornswaggle bounty quarter
      parrel. Warp red ensign snow salmagundi Jolly Roger wench Shiver me timbers loot.</p>
    </div>`
    $('.tabContent').html(template)
})
$('#tabMenu').on("click", function(event) {
  event.preventDefault();
  $('tabContent').html(menu)
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
    tags: "Mediterranean food",
    per_page: "5",
    api_key: flickrToken
  }
}).then(function(data){
  var foodItem = data.photos.photo.map(createFlickrTmpl);
  foodNode.append(foodItem);
});
