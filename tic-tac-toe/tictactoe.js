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
		this.firstAttach = true;
	}

	attached(){
		if(this.firstAttach) {
			this.firstAttach = false;
			this.newGame();
			this.ticTacToeHooks.registerUndoCallback(this.x, this.y, this.undo);
			this.ticTacToeHooks.registerSetActiveCallback(this.x, this.y, this.setActive);
		}
	}
	setMove(x, y, token) {
		this.move({x:x, y:y, token:token});
	}
	newGame() {
		this.active = true;
		this.setMessage("New Game");
		this.winningPlayer = "-";
		this.stack = [];
		this.currentGS = new GameState(this.size);
		this.turnObject.reset();
		if(this.turnObject.getCurrentPlayer().isAi)
			this.move(this.turnObject.getCurrentPlayer().getMove(this.currentGS));
	}

	move({x, y, token}) {
		if (this.isBoardInactive) {
			return;
		}
		if (this.currentGS.grid[x][y] === "-") {
			this.stack.push(this.currentGS);
			this.currentGS = new GameState(this.size, this.currentGS);
			this.currentGS.grid[x].splice(y, 1, token);
			this.currentGS.setLastMove(x, y, token);
			this.winningPlayer = TicTacToeLogic.hasGameEnded(this.size, this.currentGS.grid);
			this.ticTacToeHooks.callOnMove(this.x, this.y, x, y, token, this.winningPlayer !== "-");
			this.turnObject.advancePlayerTurn();
		}
		if(this.winningPlayer === "-") {
			if(this.turnObject.getCurrentPlayer().isAi) {
				this.move(this.turnObject.getCurrentPlayer().getMove(this.currentGS));
			}
		}
		else {
			this.setMessage(`${this.winningPlayer} has won`);
		}
	}

	setMessage(message) {
		this.message = message;
		this.ticTacToeHooks.callOnMessage(message);
	}

	undo = () => {
		if(this.stack.length > 0) {
			this.turnObject.reversePlayerTurn();
			this.currentGS = this.stack.pop();
			this.winningPlayer = TicTacToeLogic.hasGameEnded(this.size, this.currentGS.grid);
			this.setMessage("last action reversed");
		}
	}

	setActive = (active) => {
		this.active = active;
	}
}