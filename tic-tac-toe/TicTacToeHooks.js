export class TicTacToeHooks {
	constructor(){
		//will be called on a move
		this.onMoveCallbacks = [];
		//will be called on a message
		this.onMessageCallbacks = [];
		//can be called to undo any of the boards
		this.undoCallbacks = {};
		//can be called to toggle active-ness of any of the boards
		this.setActiveCallbacks = {};
	}

	registerOnMoveCallback(callback) {
		this.onMoveCallbacks.push(callback);
	}

	registerOnMessageCallback(callback) {
		this.onMessageCallbacks.push(callback);
	}

	registerUndoCallback(boardX, boardY, callback) {
		this.undoCallbacks[boardX + ":" + boardY] = callback;
	}

	registerSetActiveCallback(boardX, boardY, callback) {
		this.setActiveCallbacks[boardX + ":" + boardY] = callback;
	}

	callUndo(boardX, boardY){
		this.undoCallbacks[boardX + ":" + boardY]();
	}

	callSetActive(boardX, boardY, enable){
		this.setActiveCallbacks[boardX + ":" + boardY](enable);
	}

	activateAll(){
		Object.keys(this.setActiveCallbacks).forEach( key => {this.setActiveCallbacks[key](true)});
	}

	deactivateAll(){
		Object.keys(this.setActiveCallbacks).forEach( key => {this.setActiveCallbacks[key](false)});
	}

	callOnMove(boardX, boardY, x, y, token, victory) {
		this.onMoveCallbacks.forEach( callback => {callback(boardX, boardY, x, y, token, victory)});
	}

	callOnMessage(message) {
		this.onMessageCallbacks.forEach( callback => {callback(message)});
	}
}