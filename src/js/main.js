import $ from 'jquery';

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