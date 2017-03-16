// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//Use Heroku port or local 3000
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Pulling in routes defined under routing folder
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

//Static middleware will serve our css file
app.use(express.static('app'));

app.listen(PORT);