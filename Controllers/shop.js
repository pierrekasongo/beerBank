var Request=require('request');



exports.getIndex = (req, res, next) => {

  const page = req.params.page;

  res.render('shop/index', {

    pageTitle: 'Home',

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

exports.getFavorite = (req, res, next) => {
  res.render('shop/favorite',{

    pageTitle: 'My Favorites',
    
    path:'/favorite'
  });
};

exports.addToFavorite = (req, res, next) => {

  res.render('shop/index',{

    pageTitle: 'Add to favorite',

    path:'/add-to-favorite'

  });
};

exports.getDetails = (req, res, next) => {

  res.render('shop/show-details',{

    pageTitle:'Beer details',

    path:'/'

  });
};