/* eslint-disable no-alert, no-console */
/*eslint-env node*/

// Dependencies
var friends = require("../data/friends.js");

//This function will loop through your submitted score data and ensure it is formatted as a number
function stringToNum(newFriend) {
	newFriend.scores.forEach(function(element, index, array) {
		array[index] = parseInt(element);
	});
	return newFriend;
}

function compareScores(newFriend, friends) { 
	//Create copy of starter data so that splice does not modify original array
	var friendsCopy = [];
	Object.assign(friendsCopy, friends);

	//Set a starting score to compare against each potential friend
	var score = 100;
	var tempScore = 0;

	//These will hold the match to be returned 
	var match = {};
	var tempMatch = {};

	//Remove last index of copy array so we won't compare against ourselves
	var friendsTruncated = friendsCopy.splice(0, friendsCopy.length - 1);

	//Pull out the scores, we only need those to compare
	var newFriendArray = newFriend.scores;

	friendsTruncated.forEach(function(element) { 
		//Each index of array, we want to hold an object as a potential match
		tempMatch = element;

		//If any of the scores do not much, we take the difference in absolute value
		element.scores.forEach(function(element, index, array) {
			if(array[index] !== newFriendArray[index]) {
				tempScore += Math.abs(array[index] - newFriendArray[index]);
			}
		});

		//If the score is better than our current score, replace it as the new score to beat and make the temp match our 
		//permanent match
		if(tempScore < score){
			score = tempScore;
			match = tempMatch;
		} 

		//Make sure temp score is 0 again for a fresh comparison
		tempScore = 0;

	});

	return match;
}

module.exports = function(app){
	//Return the json data of our friends array 
	app.get("/api/friends", function(req, res) {
		res.json(friends);
	});

	//Pull data from front end, push it to friends, run through compareScores, and send back result
	app.post("/api/friends", function(req, res) {
		var newFriend = req.body;
		var toNum = stringToNum(newFriend);

		friends.push(toNum);

		var response = compareScores(toNum, friends);

		res.json(response);
	});
};