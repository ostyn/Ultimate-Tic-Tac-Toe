export class TicTacToeHooks {
	constructor(){
		//will be called on a move
		this.onMoveCallbacks = [];
		//will be called on a victory
		this.onVictoryCallbacks = [];
		//can be called to undo any of the boards
		this.undoCallbacks = {};
	}

	registerOnMoveCallback(callback) {
		this.onMoveCallbacks.push(callback);
	}

	registerOnVictoryCallback(callback) {
		this.onVictoryCallbacks.push(callback);
	}

	registerUndoCallback(boardX, boardY, callback) {
		this.undoCallbacks[boardX + ":" + boardY] = callback;
	}

	callUndo(boardX, boardY){
		this.undoCallbacks[boardX + ":" + boardY]();
	}

	callOnMove(boardX, boardY) {
		for(var x in this.onMoveCallbacks) 
			this.onMoveCallbacks[x](boardX, boardY);
	}

	callOnVictory(boardX, boardY, token){
		for(var x in this.onVictoryCallbacks) 
			this.onVictoryCallbacks[x](boardX, boardY, token);
	}
}