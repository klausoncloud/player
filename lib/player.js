'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _playerinterface = require('playerinterface');

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