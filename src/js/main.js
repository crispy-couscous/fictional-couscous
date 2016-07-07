import $ from 'jquery';

function newsTmpl(data) {
  var template = `
      ${data.title}`
  $('.newsContent').html(template)
}

var menu = $.ajax({
  url: 'https://json-data.herokuapp.com/restaurant/menu/1'
}).then(function(response) {
  console.log(response);
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