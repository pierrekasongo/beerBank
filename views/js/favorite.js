$(document).ready(function () {
  loadFavorites();
});

var appendToPage = (beers, clearFist) => {

  let count = beers.length;

  if (!count > 0) {
    $("#info").show();
  } else {
    $("#info").hide();
  }

  if (clearFist) {
    $(".grid").empty();
  }
  for (let i = 0; i < count; i++) {

    let beer = beers[i];

    let content = BEER_BOX;

    content = content.replace("{beer_css_class}", IS_FAVORITE_CSS_CLASS);

    content = content.replace("{beer_function_name}", IS_FAVORITE_FUNCTION);

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

        appendToPage(beers, true);

        $("#beer-loader").hide();
      }

    }
  });
}

var removeFromFavorite = (beerId) => {

  $.ajax({

    url: '/remove-from-favorite',

    type: 'post',

    data: { beerId: beerId },

    beforeSend: function () {

      $("#beer-loader").show();
    },
    success: function (obj) {
    },
    complete: function (data) {

      $("#beer-loader").hide();

      loadFavorites();
    }
  });
}