
class Move {
  constructor (fromCol, fromRow, toCol, toRow, type) {
    this.fromX = fromCol;
    this.fromY = fromRow;
    this.toX = toCol;
    this.toY = toRow;
    this.moveType = type;
  }
}

const MOVE_TYPE_FIRE = 'FIRE';
const MOVE_TYPE_PASS = 'PASS';
const MOVE_TYPE_MOVE = 'MOVE';
const MOVE_TYPE_SPAWN = 'SPAWN';

// Actual interface for the player developer starts here.
// Player is only supposed to know nd use the following 
// functions.

export function fireAt(atCol, atRow) {
	return new Move(0, 0, atCol, toRow, MOVE_TYPE_FIRE);
}

export function spawnInto(intoCol, intoRow) {
	return new Move(0, 0, intoCol, intoRow, MOVE_TYPE_SPAWN);
}

export function moveFromTo(fromCol, fromRow, toCol, toRow, intoRow) {
	return new Move(fromCol, fromRow, toCol, toRow, MOVE_TYPE_MOVE);
}

export function pass() {
	return new Move(0, 0, 0, 0, MOVE_TYPE_PASS);
}