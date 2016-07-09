import $ from 'jquery';
import {
  flickrToken
}
from './credentials.js';
import {
  confirmScreen
}
from './reservation.js';

var foodNode = $(".foodPics");

function newsTmpl(data) {
  var template = `
      ${data.title}`
  $('.newsContent').html(template)
};

function appetizersTmpl(data) {
  var isSpicy;
  var spicy = `<span class="entypo-flash"></span>`;
  var notSpicy = "";
  if (data.spicy === 1) {
    isSpicy = spicy;
  } else {
    isSpicy = notSpicy
  }
  var isFavorite;
  var favorite = `<span class="entypo-star"></span>`;
  var notFavorite = "";
  if (data.favorite === 1) {
    isFavorite = favorite;
  } else {
    isFavorite = notFavorite
  }
  var isAllergic;
  var allergies = `<span class="entypo-alert"></span>`;
  var notAllergic = "";
  if (data.allergies === 1) {
    isAllergic = allergies;
  } else {
    isAllergic = notAllergic
  }
  var isVegan;
  var vegan = `<span class="entypo-vimeo-circled"></span>`;
  var notVegan = "";
  if (data.vegan === 1) {
    isVegan = vegan;
  } else {
    isVegan = notVegan
  }
  var template = `
  <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
  <div class="foodBody"><div class="foodDescription">${data.description}</div>
  <div class="entreeInfo">
  ${isAllergic}${isFavorite}
  ${isSpicy}${isVegan}
  </div></div></div>`

  $('.appetizers').append(template)
};

function entreesTmpl(data) {
  var isSpicy;
  var spicy = `<span class="entypo-flash"></span>`;
  var notSpicy = "";
  if (data.spicy === 1) {
    isSpicy = spicy;
  } else {
    isSpicy = notSpicy
  }
  var isFavorite;
  var favorite = `<span class="entypo-star"></span>`;
  var notFavorite = "";
  if (data.favorite === 1) {
    isFavorite = favorite;
  } else {
    isFavorite = notFavorite
  }
  var isAllergic;
  var allergies = `<span class="entypo-alert"></span>`;
  var notAllergic = "";
  if (data.allergies === 1) {
    isAllergic = allergies;
  } else {
    isAllergic = notAllergic
  }
  var isVegan;
  var vegan = `<span class="entypo-vimeo-circled"></span>`;
  var notVegan = "";
  if (data.vegan === 1) {
    isVegan = vegan;
  } else {
    isVegan = notVegan
  }
  var template = `
    <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
    <div class="foodBody"><div class="foodDescription">${data.description}</div>
    <div class="entreeInfo">
    ${isAllergic}${isFavorite}
    ${isSpicy}${isVegan}
    </div></div></div>`
  $('.entrees').append(template)
};

function sidesTmpl(data) {
  var isSpicy;
  var spicy = `<span class="entypo-flash"></span>`;
  var notSpicy = "";
  if (data.spicy === 1) {
    isSpicy = spicy;
  } else {
    isSpicy = notSpicy
  }
  var isFavorite;
  var favorite = `<span class="entypo-star"></span>`;
  var notFavorite = "";
  if (data.favorite === 1) {
    isFavorite = favorite;
  } else {
    isFavorite = notFavorite
  }
  var isAllergic;
  var allergies = `<span class="entypo-alert"></span>`;
  var notAllergic = "";
  if (data.allergies === 1) {
    isAllergic = allergies;
  } else {
    isAllergic = notAllergic
  }
  var isVegan;
  var vegan = `<span class="entypo-vimeo-circled"></span>`;
  var notVegan = "";
  if (data.vegan === 1) {
    isVegan = vegan;
  } else {
    isVegan = notVegan
  }
  var template = `
    <div class="foodTitle">${data.item}<span class="foodPrice">${data.price}</span></div>
    <div class="foodBody"><div class="foodDescription">${data.description}</div>
    <div class="entreeInfo">
    ${isAllergic}${isFavorite}
    ${isSpicy}${isVegan}
    </div></div></div>`
  $('.sides').append(template)
};

var menu = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/menu/1'
}).then(function(response) {
  response.appetizers.forEach(appetizersTmpl)
  response.entrees.forEach(entreesTmpl)
  response.sides.forEach(sidesTmpl)
})

var news = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/news/1'
}).then(function(response) {
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
}).then(function(data) {
  var foodItem = data.photos.photo.map(createFlickrTmpl);
  foodNode.append(foodItem);
});

function specialTmpl(item) {
  var special = item[0]
  var template = `
  <div class="specialPic"><img src="http://cdn4.themediterraneandish.com/wp-content/uploads/2016/02/Spicy-Couscous-Recipe-with-Shrimp-and-Chorizo-10.jpg"></div>
  <div class="specialTitle">${special.item} <span class="specialPrice">${special.price}</span></div>
  <div class="specialDescription">${special.description}</div>
  `
  $('.specials').append(template)
}

function specialItem(menuId) {
  $.ajax({
    url: 'https://json-data.herokuapp.com/restaurant/menu/1'
  }).then(function(response) {
    var menuItem = response.entrees.filter(function(entree) {
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
var runCurrent = function(event) {
  var tab = event.target.id;

  if (tab === "tabStory") {
    $(".tabStoryBody").addClass("current");
    $(".tabMenuBody").removeClass("current");
    $(".tabReservationBody").removeClass("current");
    $(".tabReviewsBody").removeClass("current");

    $(".tabStoryBody").removeClass("notCurrent");
    $(".tabMenuBody").addClass("notCurrent");
    $(".tabReservationBody").addClass("notCurrent");
    $(".tabReviewsBody").addClass("notCurrent");

    $(".tabStory").addClass("currentTab");
    $(".tabMenu").removeClass("currentTab");
    $(".tabReservation").removeClass("currentTab");
    $(".tabReviews").removeClass("currentTab");

    $(".tabStory").removeClass("notCurrentTab");
    $(".tabMenu").addClass("notCurrentTab");
    $(".tabReservation").addClass("notCurrentTab");
    $(".tabReviews").addClass("notCurrentTab");

  } else if (tab === "tabMenu") {
    $(".tabStoryBody").removeClass("current");
    $(".tabMenuBody").addClass("current");
    $(".tabReservationBody").removeClass("current");
    $(".tabReviewsBody").removeClass("current");

    $(".tabStoryBody").addClass("notCurrent");
    $(".tabMenuBody").removeClass("notCurrent");
    $(".tabReservationBody").addClass("notCurrent");
    $(".tabReviewsBody").addClass("notCurrent");

    $(".tabStory").removeClass("currentTab");
    $(".tabMenu").addClass("currentTab");
    $(".tabReservation").removeClass("currentTab");
    $(".tabReviews").removeClass("currentTab");

    $(".tabStory").addClass("notCurrentTab");
    $(".tabMenu").removeClass("notCurrentTab");
    $(".tabReservation").addClass("notCurrentTab");
    $(".tabReviews").addClass("notCurrentTab");

  } else if (tab === "tabReservation") {
    $(".tabStoryBody").removeClass("current");
    $(".tabMenuBody").removeClass("current");
    $(".tabReservationBody").addClass("current");
    $(".tabReviewsBody").removeClass("current");

    $(".tabStoryBody").addClass("notCurrent");
    $(".tabMenuBody").addClass("notCurrent");
    $(".tabReservationBody").removeClass("notCurrent");
    $(".tabReviewsBody").addClass("notCurrent");

    $(".tabStory").removeClass("currentTab");
    $(".tabMenu").removeClass("currentTab");
    $(".tabReservation").addClass("currentTab");
    $(".tabReviews").removeClass("currentTab");

    $(".tabStory").addClass("notCurrentTab");
    $(".tabMenu").addClass("notCurrentTab");
    $(".tabReservation").removeClass("notCurrentTab");
    $(".tabReviews").addClass("notCurrentTab");

  } else if (tab === "tabReviews") {
    $(".tabStoryBody").removeClass("current");
    $(".tabMenuBody").removeClass("current");
    $(".tabReservationBody").removeClass("current");
    $(".tabReviewsBody").addClass("current");

    $(".tabStoryBody").addClass("notCurrent");
    $(".tabMenuBody").addClass("notCurrent");
    $(".tabReservationBody").addClass("notCurrent");
    $(".tabReviewsBody").removeClass("notCurrent");

    $(".tabStory").removeClass("currentTab");
    $(".tabMenu").removeClass("currentTab");
    $(".tabReservation").removeClass("currentTab");
    $(".tabReviews").addClass("currentTab");

    $(".tabStory").addClass("notCurrentTab");
    $(".tabMenu").addClass("notCurrentTab");
    $(".tabReservation").addClass("notCurrentTab");
    $(".tabReviews").removeClass("notCurrentTab");
  };
};

// Here be event listeners!

$(".tabHeader").on('click', runCurrent);

$('.formButton').on("click", function(event) {
  confirmScreen(event)
});