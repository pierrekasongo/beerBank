var page = 1;

$(document).ready(function () {

  loadBeers(page);
})

$(window).scroll(function () {

  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    loadBeers(++page);
  }
});

var loadBeers = (page) => {

  $.ajax({

    url: '/'+page,

    type: 'get',

    beforeSend: function () {
      $("#beer-loader").show();
    },
    success: function (obj) {
    },
    complete: function (data) {

      if (typeof data.responseJSON !== "undefined") {

        let beers = JSON.parse(data.responseJSON);

        appendToPage(beers,false);

        $("#beer-loader").hide();
      }
      
    }
  });
}

var appendToPage = (beers, clearFist) => {

  let count = beers.length;

  if (clearFist) {
    $(".grid").empty();
  }

  for (let i = 0; i < count; i++) {

    let beer = beers[i];

    let content = BEER_BOX;

    content = content.replace("{beer_css_class}", IS_NOT_FAVORITE_CSS_CLASS);

    content = content.replace("{beer_function_name}", IS_NOT_FAVORITE_FUNCTION);

    content = content.replace("{beer_id}", beer.id);

    content = content.replace("{beer_id}", beer.id);

    content = content.replace("{beer_image}", beer.image_url);

    content = content.replace("{beer_name}", beer.name);

    content = content.replace("{beer_tagline}", beer.tagline);

    $(".grid").append(content);
  }
}

$( "#search-input" ).keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
    searchBeer();
	}
});

$( "#search-input" ).focusout(function(event) {
    searchBeer();
});

var searchBeer = () => {

  let beerName = $("#search-input").val();

  if(beerName.length == ""){
    beerName="ALL";
  }

  $.ajax({

    url: '/search-by-name/'+beerName,

    type: 'get',

    beforeSend: function () {

      $("#beer-loader").show();
    },
    success: function (obj) {
    },
    complete: function (data) {

      if (typeof data.responseJSON !== "undefined") {

        let beers = JSON.parse(data.responseJSON);

        appendToPage(beers,true);

        $("#beer-loader").hide();
      }
    }
  });
}

var showBeerDetails =(id,event) => {

  $('modal').empty();
      
      $('.modal').append(
        '<div id="beer-detail-loader" style="display: none;">'+
              '<img class="loader-waiting" />'+
        '</div>'
      ).modal();

  $("#beer-detail-loader").show();

  $.ajax({ //Now load the selected beer details

    url: '/get-details/'+id,

    type: 'get',

    beforeSend: function () {
    },
    success: function (obj) {

    },
    complete: function (data) {

      let beer = JSON.parse(data.responseJSON)[0];

      let foodPairing = beer.food_pairing.join("<li>");

      //$("#beer-detail-loader").hide();

      $('.modal').empty();

      let content = BEER_DIALOG;

      content = content.replace("{beer_image}", beer.image_url);

      content = content.replace("{beer_name}", beer.name);

      content = content.replace("{beer_tagline}", beer.tagline);

      content = content.replace("{beer_ibu}", beer.ibu);

      content = content.replace("{beer_abv}", beer.abv);

      content = content.replace("{beer_ebc}", beer.ebc);

      content = content.replace("{beer_description}", beer.description);

      content = content.replace("{beer_pairing_food}", foodPairing);
    
      let count=0;
      //Request for 3 Random beers
      let randomBeers = "";
      $('.modal').append(
        '<div id="beer-detail-loader" style="display: none;">'+
              '<img class="loader-waiting" />'+
        '</div>'
      ).modal();
      
  $("#beer-detail-loader").show();

      for (let i = 0; i < RANDOM_BEERS; i++) {

        $.ajax({ 

          url: "/get-random-beer",
          
          type: "get",

        }).done(function (data) {

            let random = JSON.parse(data)[0];

            randomBeers += '<div class="other-title__item">' +
              '<img class="" src="' + random.image_url + '" />' +
              '<h5>' + random.name + '</h5>' +
              '</div>';
          }).always(function(){

             count++;

             if(count === 3){

               content = content.replace("{beer_randoms}", randomBeers);

               $("#beer-detail-loader").hide();

               $('modal').empty();

                $('.modal').append(content).modal();
             }

          })
      }//END LOOP
      
    }
  });
}

var addToFavorite = (beerId) => {

  $.ajax({

    url: '/add-to-favorite',

    type: 'post',

    data: { beerId: beerId },

    beforeSend: function () {

      $("#beer-loader").show();
    },
    success: function (obj) {
    },
    complete: function (data) {

      let res=data.statusText;

      $("#beer-loader").hide();

      if(res == 'See Other'){
        $('.modal').empty();
        $('.modal').append(
          '<div class="info-dialog">'+
                '<p>This beer is already available in your favorite!</p>'+
          '</div>'
        ).modal();
        
      }else{
        window.location.replace("/favorite");
      }
    }
  });
}

