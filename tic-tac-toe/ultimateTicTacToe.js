import {customElement, inject, bindable} from 'aurelia-framework';
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
import {TicTacToeLogic} from 'tic-tac-toe/TicTacToeLogic'

@customElement('uttt')
@inject(TicTacToeHooks)
export class UltimateTicTacToe {
	@bindable size = 3;
	@bindable showUndo = false;
	@bindable showNewGame = false;
	constructor(ticTacToeHooks) {
		this.ticTacToeHooks = ticTacToeHooks;
		this.moveUndoStack = [];
		this.ticTacToeHooks.registerOnMoveCallback(this.onPlay);
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

	onPlay = (boardX, boardY, playX, playY, token, victory) => {
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