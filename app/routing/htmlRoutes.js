/* eslint-disable no-alert, no-console */
/*eslint-env node*/

// Dependencies
var path = require("path");

//Exporting routes to our html to server.js
module.exports = function(app){
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname,"/../public/", "home.html"));
	});

	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname,"/../public/", "survey.html"));
	});
};

