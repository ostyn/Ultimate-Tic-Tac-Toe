import {inject} from 'aurelia-framework';
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
@inject(TicTacToeHooks)
export class UltimateTicTacToe {
	constructor(ticTacToeHooks) {
		this.ticTacToeHooks = ticTacToeHooks;
		this.stack = [];
		this.ticTacToeHooks.registerOnMoveCallback(this.onPlay);
		//this.ticTacToeHooks.registerOnVictoryCallback
	}
	onPlay = (x, y) => {
		this.stack.push({"x":x, "y":y});
	}

	undo() {
		if(this.stack.length > 0) {
			var coords = this.stack.pop();
			this.ticTacToeHooks.callUndo(coords.x, coords.y);
		}
	}
}