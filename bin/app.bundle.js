/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireAt = fireAt;
exports.spawnInto = spawnInto;
exports.moveFromTo = moveFromTo;
exports.pass = pass;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Move = function Move(fromCol, fromRow, toCol, toRow, type) {
  _classCallCheck(this, Move);

  this.fromX = fromCol;
  this.fromY = fromRow;
  this.toX = toCol;
  this.toY = toRow;
  this.moveType = type;
};

var MOVE_TYPE_FIRE = 'FIRE';
var MOVE_TYPE_PASS = 'PASS';
var MOVE_TYPE_MOVE = 'MOVE';
var MOVE_TYPE_SPAWN = 'SPAWN';

// Actual interface for the player developer starts here.
// Player is only supposed to know nd use the following 
// functions.

function fireAt(atCol, atRow) {
  return new Move(0, 0, atCol, toRow, MOVE_TYPE_FIRE);
}

function spawnInto(intoCol, intoRow) {
  return new Move(0, 0, intoCol, intoRow, MOVE_TYPE_SPAWN);
}

function moveFromTo(fromCol, fromRow, toCol, toRow, intoRow) {
  return new Move(fromCol, fromRow, toCol, toRow, MOVE_TYPE_MOVE);
}

function pass() {
  return new Move(0, 0, 0, 0, MOVE_TYPE_PASS);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _playerinterface = __webpack_require__(0);

var _player = __webpack_require__(2);

var _player2 = _interopRequireDefault(_player);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(4);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var express = require("express");
//var bodyParser = require("body-parser");
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

var board = {
	dimX: null,
	dimY: null,
	numPlayers: null,
	playerId: null
};

var player = new _player2.default();

function validParameterSet() {
	if (board.dimX == null || board.dimY == null || board.numPlayers == null || board.playerId == null) {
		return false;
	} else {
		return true;
	}
}

function sanitizePlayerReturnValue(retVal) {
	if (retVal instanceof _playerinterface.Move) {
		return retval;
	} else {
		return (0, _playerinterface.pass)();
	}
}

app.get('/startGame*', function (req, res) {
	console.log(req.originalUrl);
	board.dimX = req.query.boardX;
	board.dimY = req.query.boardY;
	board.numPlayers = req.query.numPlayers;
	board.playerId = req.query.playerId;

	if (validParameterSet()) {
		res.json(player.startGame(board.dimX, board.dimY, board.numPlayers, board.playerId));
	} else {
		res.status(400);
		res.send("Parameters incorrect. Received: " + req.originalUrl);
	}
});

app.get('/nextMove', function (req, res) {
	console.log(req.originalUrl);
	if (validParameterSet()) {
		res.json(palyer.nextMove());
	} else {
		res.status(400);
		res.send("Error: game parameters set incorrecty." + " Did you call /next before /start?");
	}
});

app.post('/moveNotification', function (req, res) {
	// No return expected, besides a 200.
	console.log(req.originalUrl);
	console.log(req.body);

	player.movesInLastRound(req.body);

	res.status(200);
	res.send("ok");
});

app.post('/endOfGame', function (req, res) {
	// No return expected, besides a 200.
	console.log(req.originalUrl);
	console.log(req.body);

	// right now: ignored

	res.status(200);
	res.send("ok");
});

var server = app.listen(3002, function () {
	var address = server.address().address;
	var port = server.address().port;

	console.log('Server listening at: ' + address + '/' + port);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playerinterface = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Actual interface for the player. You have to implement the
// methods in the class player as per the comments in each
// method.
//
// A class is used for the player so that you can actually
// create a state and use it to calculate moves.

var Player = function () {
  function Player() {
    _classCallCheck(this, Player);
  }

  _createClass(Player, [{
    key: 'startGame',


    // The umpire calls this method at the beginning of a game.
    //   boardCols and boardRows: the dimensions of the field of cells in this game.
    //     Use as you would the dimensions of an array. E.g. the base coordinates are
    //     (0/0) and the most outward legal coordinates are (boardCols-1/boardRows-1).
    //   numPlayers: the number of players in the game.
    //     You can use this to setup a state for each opponent. But this is of course
    //     optional.
    //   thisPlayerId: the id of this player. 
    //     You can use this id to filter for the results of your moves and for moves
    //     of other players impacting your player.
    // 
    // The return value of 'startGame' has to be a 'spawnInto'. Any other return will
    // lead to this plyer losing the round.
    value: function startGame(boardCols, boardRows, numPlayers, thisPlayerId) {

      // Example code:
      //   Preserve the board dimansions. 
      //   Spawn randomly inside the board.
      this.boardCols = boardCols;
      this.boardRows = boardRows;

      var intoCol = Math.floor(Math.random() * this.boardCols + 1);
      var intoRow = Math.floor(Math.random() * this.boardRows + 1);

      return (0, _playerinterface.spawnInto)(intoCol, intoRow);
    }

    // The umpire calls this method at the end of each round, sending the same 
    // information to all players.
    //   moves: a list of messages regarding moves and impact.
    //
    // This method does not return any value.

  }, {
    key: 'movesInLastRound',
    value: function movesInLastRound(moves) {}
    // ToDo: Any analysis you might want to do. Or maybe even store moves.


    // The umpire calls this method once every round. Here is your chance to do some
    // damage.
    //
    // This method has to return 'fireAt', 'spawnInto', 'moveFromTo' or a 'pass'.
    // Remember that 'spawnInto' and 'moveFromTo' com with a forced pass penalty
    // by the umpire.
    //
    // No return value or obviously corrupt return values will be treated as pass
    // either here in the player or latest by the umpire.

  }, {
    key: 'nextMove',
    value: function nextMove() {
      // Alternatives:
      //   fireAt( atCol, atRow )
      //   spawnInto( intoCol, intoRow )
      //   moveFromTo( fromCol, fromRow, toCol, toRow)
      //   pass() 
      //
      // Example code: Fire randomly. Could even hit myself.
      var atCol = Math.floor(Math.random() * this.boardCols + 1);
      var atRow = Math.floor(Math.random() * this.boardRows + 1);

      return (0, _playerinterface.fireAt)(atCol, atRow);
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ })
/******/ ]);