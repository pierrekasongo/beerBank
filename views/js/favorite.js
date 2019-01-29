/*var submitRemoveBeerForm = () => {
  $('#removeBeerForm').submit();
}*/
$(document).ready(function () {
  loadFavorites();
});

var appendToPage = (beers, clearFist) => {

  let count = beers.length;

  if(!count > 0){
    $("#info").show();
  }else{
    $("#info").hide();
  }

  if (clearFist) {
    $(".grid").empty();
  }


  for (let i = 0; i < count; i++) {

    let beer = beers[i];

    let content = FAVORITE_BOX;

    content = content.replace("{beer_id}", beer.id);

    content = content.replace("{beer_image}", beer.image_url);

    content = content.replace("{beer_name}", beer.name);

    content = content.replace("{beer_tagline}", beer.tagline);

    $(".grid").append(content);
  }
}

var loadFavorites = () => {

  $.ajax({

    url: '/get-favorites',

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

var addToFavorite = (beerId) => {

  $.ajax({

    url: '/add-to-favorite/'+beerId,

    type: 'get',

    beforeSend: function () {

      $("#beer-loader").show();
    },
    success: function (obj) {
    },
    complete: function (data) {

      if (typeof data.responseJSON !== "undefined") {

        let beers = JSON.parse(data.responseJSON);

        appendToPage(beers, true);

        $("#beer-loader").hide();
      }
    }
  });
}