
$(document).ready(function () {

  var page = 1;

  loadBeers(page);
})

var page = 1;

$(window).scroll(function () {

  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    loadBeers(++page);
  }
});

var loadBeers = (page) => {

  /*$.get('https://api.punkapi.com/v2/beers?page=' + page, function (beers) {

    appendToPage(beers);
  });*/
  $.ajax({

    url: 'https://api.punkapi.com/v2/beers?page=' + page,

    type: 'get',

    beforeSend: function () {

      $("#beer-loader").show();
    },
    success: function (obj) {

    },
    complete: function (data) {
      let beers = data.responseJSON
      appendToPage(beers);

      $("#beer-loader").hide();
    }
  });

}

var appendToPage = (beers, clearFist) => {

  let count = beers.length;

  if (clearFist) {
    $(".grid").empty();
  }

  for (let i = 0; i < count; i++) {

    $(".grid").append('<article class="card product-item"><h1 class="product__title">' +
      '<header class="card__header">' +
      '<div class="card__star">' +
      '<a href="/add-to-favorite">' +
      '<img src="/img/star.png">' +
      '</a>' +
      '</div>' +
      '<div class="card__image">' +
      '<a href="#" onclick="showBeerDetails(' + beers[i].id + ',event)">' +
      '<img src="' + beers[i].image_url + '">' +
      '</a>' +
      '</div>' +
      '</header>' +
      '<h1 class="product__title">' +
      beers[i].name +
      '</h1>' +
      '<div class="card__content">' +
      '<p class="product__description">' +
      beers[i].tagline +
      '</p></div>' +
      '</article>');
  }
}

var searchBeer = () => {

  let beerName = $("#search-input").val();

  $.get('https://api.punkapi.com/v2/beers?beer_name=' + beerName, function (beers) {

    appendToPage(beers, true);

  });
}

var showBeerDetails = (id, event) => {

  $('.modal').empty();

  $('.modal').append(
    '<div id="beer-detail-loader" style="display: none;">'+
          '<img class="beer-detail-waiting" src="/img/loading.gif">'+
    '</div>'
  ).modal();

  $("#beer-detail-loader").show();

  let randomBeers = "";

  for (let i = 0; i < 3; i++) {

    var ajaxResp = $.ajax({ //Request for 3 random beers
      url: "https://api.punkapi.com/v2/beers/random",
      type: "get",
    })
      .done(function (data) {

        let random = data[0];

        randomBeers += '<div class="other-title__item">' +
          '<img class="" src="' + random.image_url + '" />' +
          '<h5>' + random.name + '</h5>' +
          '</div>'

        if (i == 2) {
          
          $.ajax({ //Now load the selected beer details

            url: 'https://api.punkapi.com/v2/beers/' + id,

            type: 'get',

            beforeSend: function () {

            },
            success: function (obj) {

            },
            complete: function (data) {

              let beer = data.responseJSON[0];

              let foodPairing = beer.food_pairing.join("<li>");

              $("#beer-detail-loader").hide();

              $('.modal').empty();

              $('.modal').append(
                '<div class="modal__container">' +
                '<img class="modal-container__image" src="' + beer.image_url + '" />' +
                '<h2>' + beer.name + '</h2>' +
                '<p class="tagline">' + beer.tagline + '</p>' +
                '<hr /><br>' +
                '<div class="ibu_abv_ebc">' +
                '<p>IBU: <span>' + beer.ibu + '</span></p>' +
                '<p>ABV: <span>' + beer.abv + '%</span></p>' +
                '<p>EBC: <span>' + beer.ebc + '</span></p>' +
                '</div>' +
                '<br><br>' +
                '<p class="description">' + beer.description + '</p>' +

                '<p class="best-with">Best served with:</li>' +
                '<div class="list">' +
                '<ul class="pairing">' +
                '<li>' + foodPairing + '</li>' +
                '</ul>' +
                '</div>' +
                '<h4 class="other-title">You might also like:</h4>' +
                '<div class="other-items">' +
                randomBeers +
                '</div>' +
                '</div>'
              ).modal();
              $("#loader").hide();
            }
          });
        }
      })
      .fail(function () {
        console.log("error");
      })
      .always(function () {
        console.log('complete');
      });

  }//END LOOP


}

