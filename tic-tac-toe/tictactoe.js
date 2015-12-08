import {customElement, bindable, inject} from 'aurelia-framework';
import {GameState} from 'tic-tac-toe/GameState'
import {TurnObject} from 'tic-tac-toe/TurnObject'
import {TicTacToeHooks} from 'tic-tac-toe/TicTacToeHooks'
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
			this.winningPlayer = this.hasGameEnded(this.size, this.currentGS.grid);
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
			this.winningPlayer = this.hasGameEnded(this.size, this.currentGS.grid);
		}
	}
	setActive = (active) => {
		this.active = active;
	}
	hasGameEnded(size, grid) {
		//Columns
		for(var i = 0; i < size; i++) {
			var check = this.checkLine(i, 0, [0, 1], size, grid);
			if (check !== "-") {
				return check;
			}
		}
		//Rows
		for(var i = 0; i < size; i++) {
			var check = this.checkLine(0, i, [1, 0], size, grid);
			if (check !== "-") {
				return check;
			}
		}
		//Diagonals
		if (size % 2 === 1) {
			var diagonal1 = this.checkLine(0, 0, [1, 1], size, grid);
			var diagonal2 = this.checkLine(0, size-1, [1, -1], size, grid);
			if (diagonal1 !== "-") {
				return diagonal1;
			}
			else if (diagonal2 !== "-") {
				return diagonal2;
			}
		}
		for (var x = 0; x < size; x++) {
			for (var y = 0; y < size; y++) {
				if (grid[x][y] === "-")
					return "-";
			}
		}
		return "?";
	}

	checkLine(x, y, vector, size, grid) {
		var values = {};
		values[grid[x][y]] = grid[x][y];
		for (var i = 0; i < size - 1; i++) {
			x = x + vector[0];
			y = y + vector[1];
			values[grid[x][y]] = grid[x][y];
		}
		//weeds out cases with empty spaces
		if (values["-"])
			return "-";
		//No empties, no O's
		else if  (values["X"] && !values["O"])
			return "X";
		//No empties, no X's
		else if (values["O"] && !values["X"])
			return "O";
		//all cats
		return "-";
	}
}