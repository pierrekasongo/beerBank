var Request = require('request');

const API_URL="https://api.punkapi.com/v2/beers";

exports.loadIndex = (req, res) => {

  const page = req.params.page;

  if (!req.session.favorites) {

    req.session.favorites = [];
  }

  res.render('shop/index', {

    pageTitle: 'Home',

    favorites_count: req.session.favorites.length,

    path: '/',
  });
  /*Request.get("https://api.punkapi.com/v2/beers?page="+page, (error, response, body) => {

      if(error) {
          return console.log(error);
      }
      let beers=JSON.parse(body);

      res.render('shop/index', {
        
        beers:beers,

        pageTitle: 'Home',
    
        path: '/',
      });
  });*/
};

exports.getPaginated = (req, res) => {
  
  let page=req.params.page;

  Request.get(API_URL+"?page="+page, (error, response, data) => {

      if(error) {
          return console.log(error);
      }
      res.json(data);
  });
}

exports.loadFavoritePage = (req,res) => {

  res.render('shop/favorite', {

    pageTitle: 'My Favorites',

    path: '/favorite'
  });
}

exports.getFavorites = (req, res) => {

  if(!req.session.favorites)
    req.session.favorites=[];

  let beerIds = req.session.favorites.join("|");

  Request.get(API_URL+"?ids=" + beerIds, (error, response, data) => {

    if (error) {
      return console.log(error);
    }
    res.json(data);
  });
};

exports.addToFavorite = (req, res) => {

  let beerId = req.body.beerId;

  if(!req.session.favorites)
    req.session.favorites=[];

  if(req.session.favorites.includes(parseInt(beerId))){
    res.sendStatus(303);
  }else{
    req.session.favorites.push(parseInt(beerId));
    res.sendStatus(200);
  } 
};

exports.removeFromFavorite = (req, res) => {

  let beerId = req.body.beerId;

  req.session.favorites.splice(req.session.favorites.indexOf(parseInt(beerId)), 1);

  res.sendStatus(200);
}

exports.getDetails = (req, res) => {

  let beerId=req.params.beerId;

  Request.get(API_URL+"/"+beerId, (error, response, data) => {

    if(error) {
        return console.log(error);
    }
    res.json(data);
  });
}

exports.searchByName = (req,res) => {

  let beerName=req.params.beerName;

  let url="";

  if(beerName == "ALL")url=API_URL+"?page=1";

  else url=API_URL+"?beer_name="+beerName

  Request.get(url, (error, response, data) => {

      if(error) {
          return console.log(error);
      }
      res.json(data);
  });
}

exports.getRandomBeer =(req,res) => {
  
  
  Request.get(API_URL+"/random", (error, response, data) => {

    if(error) {
        return console.log(error);
    }
    res.json(data);;

  });
}

exports.getAdvancedSearch = (req, res) => {

  res.render('shop/advanced-search', {

    favorites_count: req.session.favorites.length,

    pageTitle: 'Advanced search',

    path: '/advanced-search'
  })
}

exports.postAdvancedSearch = (req, res) => {

  let max_ibu = req.body.max_ibu;
  let min_ibu = req.body.min_ibu;
  let max_abv = req.body.max_abv;
  let min_abv = req.body.min_abv;
  let max_ebc = req.body.max_ebc;
  let min_ebc = req.body.min_ebc;
  let brewed_before = req.body.brewed_before;
  let brewed_after = req.body.brewed_after;

  let url = API_URL+'?';

  if (max_ibu.length > 0) {
    url += 'ibu_gt=' + max_ibu + ' ';
  }
  if (min_ibu.length > 0) {
    url = url.replace(' ', '&');
    url += 'ibu_lt=' + min_ibu + ' ';
  }
  if (max_abv.length > 0) {

    url = url.replace(' ', '&');
    url += 'abv_gt=' + max_abv + ' ';
  }
  if (min_abv.length > 0) {

    url = url.replace(' ', '&');
    url += 'abv_lt=' + min_abv + ' ';
  }
  if (max_ebc.length > 0) {

    url = url.replace(' ', '&');
    url += 'ebc_gt=' + max_ebc + ' ';
  }
  if (min_ebc.length > 0) {

    url = url.replace(' ', '&');
    url += 'ebc_lt=' + min_ebc + ' ';
  }
  if (brewed_before.length > 0) {

    url = url.replace(' ', '&');
    url += 'brewed_before=' + brewed_before + ' ';
  }
  if (brewed_after.length > 0) {

    url = url.replace(' ', '&');
    url += 'brewed_after=' + brewed_after + ' ';
  }

  url = url.trim();

  Request.get(url, (error, response, data) => {

    if (error) {
      return console.log(error);
    }
    let beers = JSON.parse(data);

    let params=url.replace(API_URL+'?','');
    params=params.split('&');
    params=params.join(' ');

    res.render('shop/search-result', {

      favorites_count: req.session.favorites.length,
  
      pageTitle: 'Advanced search result',

      params:params,

      beers:beers,
  
      path: '/search-result'
    })
    
  }); 
}
