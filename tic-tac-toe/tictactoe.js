import {customElement, bindable, inject} from 'aurelia-framework';
import {GameState} from 'tic-tac-toe/GameState'
import {TurnObject} from 'tic-tac-toe/TurnObject'
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
import {TicTacToeLogic} from 'tic-tac-toe/TicTacToeLogic'
@customElement('ttt')
@inject(TurnObject, TicTacToeHooks)
export class TicTacToe {
	@bindable size;
	@bindable x;
	@bindable y;
	@bindable showUndo;
	constructor(turnObject, ticTacToeHooks) {
		this.turnObject = turnObject;
		this.ticTacToeHooks = ticTacToeHooks;
		this.winningPlayer = "-";
	}
	attached(){
		this.ticTacToeHooks.registerUndoCallback(this.x, this.y, this.undo);
		this.ticTacToeHooks.registerSetActiveCallback(this.x, this.y, this.setActive);
	}
	created() {
		this.newGame();
	}
	newGame() {
		this.active = true;
		this.stack = [];
		this.currentGS = new GameState();
	}
	play(x, y, token) {
		if (this.isBoardInactive) {
				this.gs.message = "Bad square";
				return;
		}
		if (this.currentGS.grid[x][y] === "-") {
			this.stack.push(this.currentGS);
			this.currentGS = new GameState(this.currentGS);
			this.currentGS.grid[x].splice(y, 1, token);
			this.currentGS.setLastMove(x, y, token);
			this.winningPlayer = TicTacToeLogic.hasGameEnded(this.size, this.currentGS.grid);
			if(this.winningPlayer !== "-") {
				this.ticTacToeHooks.callOnMove(this.x, this.y, x, y, token, true);
			}
			else {
				this.ticTacToeHooks.callOnMove(this.x, this.y, x, y, token, false);
			}
			this.turnObject.advancePlayerTurn();
		} else {
			//this.gs.message = "Bad move. Choose an empty space";
		}
	}
	undo = () => {
		if(this.stack.length > 0) {
			this.turnObject.reversePlayerTurn();
			this.currentGS = this.stack.pop();
			this.winningPlayer = TicTacToeLogic.hasGameEnded(this.size, this.currentGS.grid);
		}
	}
	setActive = (active) => {
		this.active = active;
	}
}