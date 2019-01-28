const path = require('path');

const express = require('express');

var Request=require('request');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/:page', shopController.getIndex);

router.get('/favorite', shopController.getFavorite);

router.get('/show-details',shopController.getDetails);

router.get('/add-to-favorite',shopController.addToFavorite);



module.exports = router;
