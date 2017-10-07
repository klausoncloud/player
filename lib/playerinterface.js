'use strict';

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