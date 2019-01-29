const path = require('path');

const express = require('express');

var Request=require('request');

const myController = require('../controllers/myController');

const router = express.Router();

router.get('/', myController.loadIndex);

router.get('/favorite', myController.loadFavoritePage);

router.get('/get-favorites', myController.getFavorites);

router.get('/get-details/:beerId',myController.getDetails);

router.get('/add-to-favorite/:beerId',myController.addToFavorite);

router.post('/remove-from-favorite',myController.removeFromFavorite);

router.get('/search-by-name/:beerName',myController.searchByName);

router.get('/advanced-search',myController.getAdvancedSearch);

router.get('/get-random-beer',myController.getRandomBeer);

router.post('/advanced-search',myController.postAdvancedSearch);

router.get('/:page', myController.getPaginated);

module.exports = router;
