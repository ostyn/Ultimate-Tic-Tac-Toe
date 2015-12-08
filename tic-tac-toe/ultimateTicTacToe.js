import {inject} from 'aurelia-framework';
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'

@inject(TicTacToeHooks)
export class UltimateTicTacToe {
	constructor(ticTacToeHooks) {
		this.ticTacToeHooks = ticTacToeHooks;
		this.moveUndoStack = [];
		this.ticTacToeHooks.registerOnMoveCallback(this.onPlay);
		this.reset();
	}

	reset() {
		this.size = 3;
		this.grid = [];
		this.gameOver = false;
		this.message = "";
		for (var column = 0; column < this.size; column++) {
				for (var row = 0; row < this.size; row++) {
					if (!this.grid[row])
						this.grid.splice(row, 1, []);
					this.grid[row].splice(column, 1, "-");
				}
		}	
	}

	logBoard(x, y, piece){
		this.grid[x].splice(y, 1, piece);
		var potentialWinner = "-";// = this.hasGameEnded(this.size, this.grid);
		if (potentialWinner !== "-") {
			this.gameOver = true;
			this.message = "The game is over and " + potentialWinner + " won!";
		}
	}

	onPlay = (boardX, boardY, playX, playY, token, victory) => {
		this.moveUndoStack.push({"x":boardX, "y":boardY, "victory" : victory});
		if(victory)
			this.logBoard(boardX, boardY, token);
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