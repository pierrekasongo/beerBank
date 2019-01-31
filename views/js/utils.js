
const BEER_DIALOG =
  '<div class="modal__container">' +
      '<img class="modal-container__image" src="{beer_image}" />' +
      '<h2>{beer_name}</h2>' +
      '<p class="tagline">{beer_tagline}</p>' +
      '<hr /><br>' +
      '<div class="ibu_abv_ebc">' +
          '<p>IBU: <span>{beer_ibu}</span></p>' +
          '<p>ABV: <span>{beer_abv}</span></p>' +
          '<p>EBC: <span>{beer_ebc}</span></p>' +
      '</div>' +
      '<br><br>' +
      '<p class="description">{beer_description}</p>' +

      '<p class="best-with">Best served with:</li>' +
      '<div class="list">' +
          '<ul class="pairing">' +
              '<li>{beer_pairing_food}</li>' +
          '</ul>' +
      '</div>' +
      '<h4 class="other-title">You might also like:</h4>' +
      '<div class="other-items">' +
          '{beer_randoms}' +
      '</div>' +
  '</div>';

const BEER_BOX =
  '<article class="card product-item">'+
      '<header class="card__header">'+
        '<div class="card__star">'+
            '<button class="{beer_css_class}" onclick="{beer_function_name}({beer_id})">'+
            '</button>'+
        '</div>'+
        '<div class="card__image">'+
          '<a href="#" onclick="showBeerDetails({beer_id},event)">' +
            '<img src="{beer_image}">'+
          '</a>'+
        '</div>'+
      '</header>'+
        '<h1 class="product__title">'+
          '{beer_name}'+
        '</h1>'+
        '<div class="card__content">'+
          '<p class="product__description">'+
            '{beer_tagline}'+
          '</p>'+
        '</div>'+
    '</article>';

const RANDOM_BEERS=3;
const IS_FAVORITE_CSS_CLASS='btn-favorite-remove';
const IS_NOT_FAVORITE_CSS_CLASS='btn-favorite-add';
const IS_FAVORITE_FUNCTION='removeFromFavorite';
const IS_NOT_FAVORITE_FUNCTION='addToFavorite';
