var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var db = req.db;
  var collection = db.get('movieDetails');

      collection.find({},{},function(e,docs){
      	   //res.send(docs.length);
      	   res.json('Jumlah data : ' + docs.length);
      	   //console.log(docs.length);
      });

});


/* GET home page. */
router.get('/multiple', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var db = req.db;
  var collection = db.get('movieDetails');
  
      collection.find({ "rated": "PG-13", "year": 2013, "awards.wins": 0},
      				  {},function(e,docs){
      	//res.send(docs);
        res.send(JSON.stringify(docs));
      });
  
});


/* GET home page. */
router.get('/array_nested*', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var wins = parseInt(req.query.win);
  var db = req.db;
  var collection = db.get('movieDetails');
  
  //res.send(wins);
      
      collection.find({"awards.wins": {$gt : wins}},{},function(e,docs){
      	//res.send(docs);
        res.send(JSON.stringify(docs, null,10));
      });

});



/* GET home page. */
router.get('/and', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var wins = parseInt(req.query.win);
  var db = req.db;
  var collection = db.get('movieDetails');
  /*
  db.movieDetails.find({ $or : [ { "tomato.meter": { $gt: 99 } },
                               { "metacritic": { $gt: 95 } } ] })


  db.movieDetails.find({ $and : [ { "metacritic": { $ne: 100 } },
                                { "metacritic": { $exists: true } } ] })
  */
 
      
      collection.find({ $and : [ { "metacritic": { $ne: 100 } },
                                { "metacritic": { $exists: true } } ] } ,{},function(e,docs){
        res.send(docs);
      });

});


/* GET home page. */
router.get('/or', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var wins = parseInt(req.query.win);
  var db = req.db;
  var collection = db.get('movieDetails');
 
      collection.find({$or : [ { 'tomato.meter': { $gt: 99 } }, 
                               { 'metacritic': { $gt: 95 } } ] } ,{},function(e,docs){
        res.send(docs);
      });

});



/* GET home page. */
router.get('/regex', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var wins = parseInt(req.query.win);
  var db = req.db;
  var collection = db.get('movieDetails');
 
      collection.find({"awards.text":{$regex: /^Won\s.*/}},{"awards.text":1, _id:0},function(e,docs){
        res.send(docs);
      });

});


/* GET home page. */
router.get('/array/:mode', function(req, res, next) {
  
  var db = req.db;
  var collection = db.get('movieDetails');
 
  var kode = req.params.mode;//parseInt(req.query.kode);


  if(kode ==='all'){
      collection.find({genres: {$all: ["Comedy", "Crime", "Drama"]}},
                      {title:1, _id:0},function(e,docs){
          //res.send(docs);
          res.json('Jumlah data : ' + docs.length);
      });
  }else 
  if(kode === 'size'){
      collection.find({countries: {$size: 1}},
                      {title:1, _id:0},function(e,docs){
          //res.send(docs);
          res.json('Jumlah data : ' + docs.length);
      });
  }else 
  if(kode === 'no'){
    collection.find({genres: ["Comedy", "Crime"]},
                      {title:1, _id:0},function(e,docs){
          //res.send(docs);
          res.json('Jumlah data : ' + docs.length);
      });
  }
  /*
  switch(kode){
    case 1:
        collection.find({genres: {$all: ["Comedy", "Crime", "Drama"]}},
                      {title:1, _id:0},function(e,docs){
        res.send(docs);
      });
        break;
    case 2:
      collection.find({countries: {$size: 1}},
                      {title:1, _id:0},function(e,docs){
        res.send(docs);
      });
      break;

    default:
        collection.find({genres: {$all: ["Comedy", "Crime", "Drama"]}},
                      {title:1, _id:0},function(e,docs){
        res.send(docs);
      });
  }
  */ 

});


module.exports = router;
