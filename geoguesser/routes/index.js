var express = require('express');
var router = express.Router();
const API_KEY = "AIzaSyBFvj2Pr18efj-xVFacYXz4-0M5OyqbWvY"
const LAT = "46.6407, 27.7276"


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Geoguesser' ,lat:LAT, api_key: API_KEY});
});

module.exports = router;
