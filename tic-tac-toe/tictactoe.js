import {customElement, bindable} from 'aurelia-framework';
import {GameState} from 'tic-tac-toe/GameState'
import {TurnObject} from 'tic-tac-toe/TurnObject'
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
import {TicTacToeLogic} from 'tic-tac-toe/TicTacToeLogic'
@customElement('ttt')
export class TicTacToe {
	@bindable size = 3;
	@bindable x;
	@bindable y;
	@bindable showUndo = false;
	@bindable showNewGame = false;
	@bindable showMessage = false;
	@bindable ticTacToeHooks = new TicTacToeHooks();
	@bindable turnObject = new TurnObject();
	constructor() {
	}
	attached(){
		this.newGame();
		this.ticTacToeHooks.registerUndoCallback(this.x, this.y, this.undo);
		this.ticTacToeHooks.registerSetActiveCallback(this.x, this.y, this.setActive);
	}
	newGame() {
		this.active = true;
		this.message = "New Game";
		this.winningPlayer = "-";
		this.stack = [];
		this.currentGS = new GameState(this.size);
		this.turnObject.reset();
	}
	play(x, y, token) {
		if (this.isBoardInactive) {
				this.gs.message = "Bad square";
				return;
		}
		if (this.currentGS.grid[x][y] === "-") {
			this.stack.push(this.currentGS);
			this.currentGS = new GameState(this.size, this.currentGS);
			this.currentGS.grid[x].splice(y, 1, token);
			this.currentGS.setLastMove(x, y, token);
			this.winningPlayer = TicTacToeLogic.hasGameEnded(this.size, this.currentGS.grid);
			if(this.winningPlayer !== "-") {
				this.ticTacToeHooks.callOnMove(this.x, this.y, x, y, token, true);
				this.message = `${this.winningPlayer} has won`;
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
			this.message = "last action reversed";
		}
	}
	setActive = (active) => {
		this.active = active;
	}
}