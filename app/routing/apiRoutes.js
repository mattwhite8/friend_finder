// Dependencies
var friends = require('../data/friends.js');


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
	});

	app.post('/api/friends', function(req, res) {
		var newFriend = req.body;
		var toNum = stringToNum(newFriend);

		friends.push(toNum);
		console.log(friends);

		var response = compareScores(toNum, friends);
		res.json(response);
	});
};