import {customElement, bindable} from 'aurelia-framework';
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
import {TurnObject} from 'tic-tac-toe/TurnObject'
import {TicTacToeLogic} from 'tic-tac-toe/TicTacToeLogic'

@customElement('uttt')
export class UltimateTicTacToe {
	@bindable size = 3;
	@bindable showUndo = true;
	@bindable showNewGame = true;
	@bindable showMessage = true;
	@bindable ticTacToeHooks = new TicTacToeHooks();
	@bindable turnObject = new TurnObject();
	constructor(ticTacToeHooks) {
		this.moveUndoStack = [];
		this.ticTacToeHooks.registerOnMoveCallback(this.onMove);
		this.ticTacToeHooks.registerOnMessageCallback(this.setMessage);
		this.newGame();
	}

	newGame() {
		this.grid = [];
		this.moveUndoStack = [];
		this.gameOver = false;
		this.message = "";
		this.grid = TicTacToeLogic.generateBoard(this.size);
	}

	logBoard(x, y, piece){
		this.grid[x].splice(y, 1, piece);
		var potentialWinner  = TicTacToeLogic.hasGameEnded(this.size, this.grid);
		if (potentialWinner !== "-") {
			this.moveUndoStack = [];
			this.gameOver = true;
			this.ticTacToeHooks.deactivateAll();
			this.message = "The game is over and " + potentialWinner + " won!";
		}
	}

	onMove = (boardX, boardY, playX, playY, token, victory) => {
		this.moveUndoStack.push({"x":boardX, "y":boardY, "victory" : victory});
		if(victory) 
			this.logBoard(boardX, boardY, token);
		if(this.gameOver)
			return;
		if(this.grid[playX][playY] === "-") {
			this.ticTacToeHooks.deactivateAll();
			this.ticTacToeHooks.callSetActive(playX, playY, true);
		}
		else {
			this.ticTacToeHooks.activateAll();
		}
	}

	setMessage = (message) => {
		this.message = message;
	}

	undo() {
		if(this.moveUndoStack.length > 0) {
			this.message = "";
			this.gameOver = false;
			var move = this.moveUndoStack.pop();
			this.ticTacToeHooks.callUndo(move.x, move.y);
			if(move.victory)
				this.logBoard(move.x, move.y, "-");
			if(this.moveUndoStack.length === 0) {
				this.ticTacToeHooks.activateAll();
			}
			else {
				this.ticTacToeHooks.deactivateAll();
				this.ticTacToeHooks.callSetActive(move.x, move.y, true);
			}
		}
	}
}