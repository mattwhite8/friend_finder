// Dependencies
var friends = require('../data/friends.js');
// var jsonfile = require('jsonfile');
// var file = '../data/friends.json';

function stringToNum(newFriend) {
	newFriend.scores.forEach(function(element, index, array) {
		array[index] = parseInt(index);
	});
	return newFriend;
};

function compareScores(newFriend, friends) { 
	var score = 100;
  	var tempScore = 0;
	var match = {};
  	var tempMatch = {};
  
	var friendsTruncated = friends.splice(0, friends.length - 1);
  	var newFriendArray = newFriend.scores;
  
	friendsTruncated.forEach(function(element, index, array) { 
  		tempMatch = element;
    
	  	element.scores.forEach(function(element, index, array) {
	    	if(array[index] !== newFriendArray[index]) {
	      		tempScore += Math.abs(array[index] - newFriendArray[index]);
	      	}
	    });
    
	   if(tempScore < score){
	    score = tempScore;
	    match = tempMatch;
	   } 

   	   tempScore = 0;

	});

	return match;
};

module.exports = function(app){
	app.get('/api/friends', function(req, res) {
		res.json(friends);
		// jsonfile.readFile(file, function(err, obj) {
		// 	if (err) throw err;
		//   	res.json(obj);
		// });
	});

	app.post('/api/friends', function(req, res) {
		var newFriend = req.body;
		stringToNum(newFriend);
		friends.push(newFriend);

		var response = compareScores(newFriend, friends);
		res.json(response);
	});
};