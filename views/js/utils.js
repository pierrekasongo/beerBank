const BEER_BOX =
  '<article class="card product-item"><h1 class="product__title">' +
  '<header class="card__header">' +
  '<div class="card__star">' +
  '<a href="#" onclick="addToFavorite({beer_id})">' +
  '<img src="/img/star-black.png" alt="Add this to favorite">' +
  '</a>' +
  '</div>' +
  '<div class="card__image">' +
  '<a href="#" onclick="showBeerDetails({beer_id},event)">' +
  '<img src="{beer_image}">' +
  '</a>' +
  '</div>' +
  '</header>' +
  '<h1 class="product__title">' +
  '{beer_name}' +
  '</h1>' +
  '<div class="card__content">' +
  '<p class="product__description">' +
  '{beer_tagline}' +
  '</p>' +
  '</div>' +
  '</article>';

const BEER_DETAIL =
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

const FAVORITE_BOX =
  '<article class="card product-item">'+
    '<h1 class="product__title">'+
      '<header class="card__header">'+
        '<div class="card__star">'+
          '<form name="removeBeerForm" id="removeBeerForm" action="/remove-from-favorite" method="GET">'+
            '<input type="hidden" name="beerId" id="beerId" value="{beer_id}" />'+
            '<button class="btn-favorite-remove" type="submit">'+
            '</button>'+
          '</form>'+
        '</div>'+
        '<div class="card__image">'+
          '<a href="#" onclick="">'+
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
