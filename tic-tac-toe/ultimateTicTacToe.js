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
		this.stack.push({"x":boardX, "y":boardY});
		if(victory)
			this.gs.logVictory(boardX, boardY, token);
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
			var coords = this.stack.pop();
			this.ticTacToeHooks.callUndo(coords.x, coords.y);
			if(this.stack.length === 0) {
				this.ticTacToeHooks.activateAll();
			}
			else {
				this.ticTacToeHooks.deactivateAll();
				this.ticTacToeHooks.callSetActive(coords.x, coords.y, true);
			}
		}
	}
}