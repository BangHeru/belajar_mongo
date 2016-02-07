var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/demodummy';

// var indexRestaurants = function(db, callback) {
//    db.collection('restaurants').createIndex(
//       { "cuisine": 1 },
//       null,
//       function(err, results) {
//          console.log(results);
//          callback();
//       }
//    );
// };


// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   indexRestaurants(db, function() {
//       db.close();
//   });
// });

//=========

var indexRestaurants = function(db, callback) {
   db.collection('restaurants').createIndex(
      { "cuisine": 1, "address.zipcode": -1 },
      null,
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  indexRestaurants(db, function() {
      db.close();
  });
});
