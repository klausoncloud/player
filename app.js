//var querystring = require("querystring");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

var board = {
	dimX : null,
	dimY : null,
    numPlayers : null,
    playerId : null
};

function move(fromX, fromY, toX, toY, type) {
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
    this.moveType = type;
}

function fire() {
	var toX = Math.floor((Math.random() * board.dimX) + 1);
	var toY = Math.floor((Math.random() * board.dimY) + 1);
	return new move(0, 0, toX, toY, "FIRE");
}

function spawn() {
	var toX = Math.floor((Math.random() * board.dimX) + 1);
	var toY = Math.floor((Math.random() * board.dimY) + 1);
	// Todo: Don't shoot yourself!
	return new move(0, 0, toX, toY, "SPAWN");
}

function validParameterSet() {
	if (board.dimX == null || board.dimY == null 
		|| board.numPlayers == null || board.playerId == null) {
		return false;
	} else {
		return true;
	}
}

app.get('/startGame*', function(req, res){
	console.log(req.originalUrl);
	board.dimX = req.query.boardX;
	board.dimY = req.query.boardY;
	board.numPlayers = req.query.numPlayers;
	board.playerId = req.query.playerId

	if (validParameterSet()) {
        res.json(spawn());
	} else {
        res.status(400);
        res.send("Parameters incorrect. Received: " + req.originalUrl);
	}
});

app.get('/nextMove', function(req, res) {
	console.log(req.originalUrl);
	if (validParameterSet()) {
        res.json(fire());
	} else {
        res.status(400);
        res.send("Error: game parameters set incorrecty."
        	+ " Did you call /next before /start?");
	}
});

app.post('/moveNotification', function(req, res) {
	// No return expected, besides a 200.
	console.log(req.originalUrl);
	console.log(req.body);
	res.status(200);
	res.send("ok");
});

app.post('/endOfGame', function(req, res) {
	// No return expected, besides a 200.
	console.log(req.originalUrl);
	console.log(req.body);
	res.status(200);
	res.send("ok");
});

var server = app.listen(3002, function() {
	var address = server.address().address;
	var port = server.address().port;

	console.log('Server listening at: ' + address + '/' + port);
});