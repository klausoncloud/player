import { Move, pass } from './playerinterface';
import Player from './player';

import express from 'express';
import bodyParser from 'body-parser';

//var express = require("express");
//var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

var board = {
	dimX : null,
	dimY : null,
    numPlayers : null,
    playerId : null
};

var player = new Player();


function validParameterSet() {
	if (board.dimX == null || board.dimY == null 
		|| board.numPlayers == null || board.playerId == null) {
		return false;
	} else {
		return true;
	}
}

function sanitizePlayerReturnValue(retVal) {
	if (retVal instanceof Move) {
		return( retval );
	} else {
		return pass();
	}
}

app.get('/startGame*', function(req, res){
	console.log(req.originalUrl);
	board.dimX = req.query.boardX;
	board.dimY = req.query.boardY;
	board.numPlayers = req.query.numPlayers;
	board.playerId = req.query.playerId

	if (validParameterSet()) {
        res.json(player.startGame(board.dimX, board.dimY, board.numPlayers, board.playerId));
	} else {
        res.status(400);
        res.send("Parameters incorrect. Received: " + req.originalUrl);
	}
});

app.get('/nextMove', function(req, res) {
	console.log(req.originalUrl);
	if (validParameterSet()) {
        res.json(palyer.nextMove());
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

    player.movesInLastRound(req.body);

	res.status(200);
	res.send("ok");
});

app.post('/endOfGame', function(req, res) {
	// No return expected, besides a 200.
	console.log(req.originalUrl);
	console.log(req.body);

    // right now: ignored

	res.status(200);
	res.send("ok");
});

var server = app.listen(3002, function() {
	var address = server.address().address;
	var port = server.address().port;

	console.log('Server listening at: ' + address + '/' + port);
});