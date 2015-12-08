import {inject} from 'aurelia-framework';
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
import {GameState} from 'tic-tac-toe/GameState'
@inject(TicTacToeHooks, GameState)
export class UltimateTicTacToe {
	constructor(ticTacToeHooks, gs) {
		this.gs = gs;
		this.ticTacToeHooks = ticTacToeHooks;
		this.stack = [];
		this.ticTacToeHooks.registerOnMoveCallback(this.onPlay);
	}
	onPlay = (boardX, boardY, playX, playY, token, victory) => {
		this.stack.push({"x":boardX, "y":boardY, "victory" : victory});
		if(victory)
			this.gs.logBoard(boardX, boardY, token);
		if(this.gs.grid[playX][playY] === "-") {
			this.ticTacToeHooks.deactivateAll();
			this.ticTacToeHooks.callSetActive(playX, playY, true);
		}
		else {
			this.ticTacToeHooks.activateAll();
		}
		
	}

	undo() {
		if(this.stack.length > 0) {
			var move = this.stack.pop();
			this.ticTacToeHooks.callUndo(move.x, move.y);
			if(move.victory)
				this.gs.logBoard(move.x, move.y, "-");
			if(this.stack.length === 0) {
				this.ticTacToeHooks.activateAll();
			}
			else {
				this.ticTacToeHooks.deactivateAll();
				this.ticTacToeHooks.callSetActive(move.x, move.y, true);
			}
		}
	}
}