// Dependencies
var friends = require('../data/friends.js');

function matchScore(newFriend){
	var bestMatch = [];
	var bestScore = 0;
	var friendsTruncated = friends.pop();

};

function stringToNum(newFriend) {
	newFriend.scores.forEach(function(element, index, array) {
		array[index] = parseInt(index);
	});
	return newFriend;
};

module.exports = function(app){
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		var newFriend = req.body;
		stringToNum(newFriend);
		friends.push(newFriend);
		res.json(newFriend);
	});
};