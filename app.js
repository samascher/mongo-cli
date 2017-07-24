var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

// Find all
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  if(allChoice == "all"){
    collection.find().toArray(function(err, doc){
      console.log(doc);
    });
  } else {
    console.log("Aw, you don't want to see the restaurants?");
  }
});

// Task 1
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var singleChoice = prompt("Enter a restaurant please: ");
    collection.find({"name":singleChoice}).toArray(function(err,doc){
    	console.log(doc);
    });
});

// Task 2
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var addName = prompt("Add the name of a resturant below: ");
  var addZipCode = prompt("Add the zip code of a resturant below: ");
    collection.insert({
    	"name":addName,
    	"address":addAddress,
    	"zip":addZipCode,
    });
});

//Task 3 -- USER EDIT
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var whichRestaurant = prompt("What restaurant would you like to edit? ");
	var name = prompt("What would you like to call it? ");
	var street = prompt("What is its new street address? ");
	var zip = prompt("What is its new zip code? ");
	var yelp = prompt("What is its Yelp URL? ");
	var toUpdate = {
		"name": name,
		"address": {
			"street": street,
			"zipcode": zip
		},
		"yelp": yelp
	};
	collection.update({"name": whichRestaurant}, toUpdate);
	collection.find({"name": name}).toArray(function(err, doc) {
		console.log(doc);
	});
});

//Task 4 -- USER DELETE
mongo.connect(url, function(err, db) {
	var collection = db.collection('restaurants');
	var whichRestaurant = prompt("What restaurant would you like to delete? ");
	collection.remove({"name": whichRestaurant});
	collection.find().toArray(function(err, doc) {
		console.log(doc);
	});
});
