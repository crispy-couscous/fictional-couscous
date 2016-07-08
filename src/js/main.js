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
  <div class="foodBody"><div class="foodDescription">${data.description}</div>
  <div class="entreeInfo">
  <span class="entypo-alert"></span><span class="entypo-star"></span>
  <span class="entypo-flash"></span><span class="entypo-vimeo-circled"></span>
  </div></div></div>`

  $('.appetizers').append(template)
};

function entreesTmpl (data) {
  var template =`
  <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
  <div class="foodBody"><div class="foodDescription">${data.description}</div>
  <div class="entreeInfo">
  <span class="entypo-alert"></span><span class="entypo-star"></span>
  <span class="entypo-flash"></span><span class="entypo-vimeo-circled"></span>
  </div></div></div>`
  $('.entrees').append(template)
};

function sidesTmpl (data) {
  var template =`
  <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
  <div class="foodBody"><div class="foodDescription">${data.description}</div>
  <div class="entreeInfo">
  <span class="entypo-alert"></span><span class="entypo-star"></span>
  <span class="entypo-flash"></span><span class="entypo-vimeo-circled"></span>
  </div></div></div>`
  $('.sides').append(template)
};

var menu = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/menu/1'
}).then(function(response) {
  // console.log(response);
  response.appetizers.forEach(appetizersTmpl)
  response.entrees.forEach(entreesTmpl)
  response.sides.forEach(sidesTmpl)
})

var news = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/news/1'
}).then(function(response) {
  // console.log(response.title);
  var template = `
        <div class="newsTitle">
          ${response.title} <span class="newsDate">${response.date_published}</span>
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
    // $('.tabContent').html(template)
})
// $('#tabMenu').on("click", function(event) {
//   event.preventDefault();
//   $('tabContent').html(menu)
// })
// $('#servation').on("click", function(event) {
//   event.preventDefault();
// })

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

function specialTmpl(item){
  var special = item[0]
  var template = `
  <div class="specialPic"><img src="http://cdn4.themediterraneandish.com/wp-content/uploads/2016/02/Spicy-Couscous-Recipe-with-Shrimp-and-Chorizo-10.jpg"></div>
  <div class="specialTitle">${special.item} <span class="specialPrice">${special.price}</span></div>
  <div class="specialDescription">${special.description}</div>
  `
  $('.specials').append(template)
}

function specialItem(menuId) {
  console.log(menuId)
  $.ajax({
    url: 'https://json-data.herokuapp.com/restaurant/menu/1'
  }).then(function(response) {
    console.log(response.entrees)
    var menuItem = response.entrees.filter(function(entree){
      return entree.id === menuId;
    })
    specialTmpl(menuItem)
  })
}

$.ajax({
  url: `https://json-data.herokuapp.com/restaurant/special/1`
}).then(function(response) {
  specialItem(response.menu_item_id)
})

// Tab listener below here
var runCurrent = function (event) {
  var tab = event.target.id;

  if (tab === "tabStory"){
    $(".tabStoryBody").addClass( "current" );
    $(".tabMenuBody").removeClass( "current" );
    $(".tabReservationBody").removeClass( "current" );

    $(".tabStoryBody").removeClass( "notCurrent" );
    $(".tabMenuBody").addClass( "notCurrent" );
    $(".tabReservationBody").addClass( "notCurrent" );

    $(".tabStory").addClass( "currentTab" );
    $(".tabMenu").removeClass( "currentTab" );
    $(".tabReservation").removeClass( "currentTab" );

    $(".tabStory").removeClass( "notCurrentTab" );
    $(".tabMenu").addClass( "notCurrentTab" );
    $(".tabReservation").addClass( "notCurrentTab" );
  }
  else if (tab === "tabMenu"){
    $(".tabStoryBody").removeClass( "current" );
    $(".tabMenuBody").addClass( "current" );
    $(".tabReservationBody").removeClass( "current" );

    $(".tabStoryBody").addClass( "notCurrent" );
    $(".tabMenuBody").removeClass( "notCurrent" );
    $(".tabReservationBody").addClass( "notCurrent" );

    $(".tabStory").removeClass( "currentTab" );
    $(".tabMenu").addClass( "currentTab" );
    $(".tabReservation").removeClass( "currentTab" );

    $(".tabStory").addClass( "notCurrentTab" );
    $(".tabMenu").removeClass( "notCurrentTab" );
    $(".tabReservation").addClass( "notCurrentTab" );
  }
  else if (tab === "tabReservation"){
    $(".tabStoryBody").removeClass( "current" );
    $(".tabMenuBody").removeClass( "current" );
    $(".tabReservationBody").addClass( "current" );

    $(".tabStoryBody").addClass( "notCurrent" );
    $(".tabMenuBody").addClass( "notCurrent" );
    $(".tabReservationBody").removeClass( "notCurrent" );

    $(".tabStory").removeClass( "currentTab" );
    $(".tabMenu").removeClass( "currentTab" );
    $(".tabReservation").addClass( "currentTab" );

    $(".tabStory").addClass( "notCurrentTab" );
    $(".tabMenu").addClass( "notCurrentTab" );
    $(".tabReservation").removeClass( "notCurrentTab" );
  };
};

$(".tabHeader").on('click', runCurrent);
