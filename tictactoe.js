import {customElement, bindable, inject} from 'aurelia-framework';
import {GameState} from './GameState'
@inject(GameState)
@customElement('ttt')
export class TicTacToe {
	@bindable size;
	@bindable x;
	@bindable y;
	constructor(gs) {
		this.gs = gs;
	}
	created() {
		this.newGame();
	}
	newGame() {
		this.gs.message = "";
		this.grid = [];
		this.active = true;
		this.winningPlayer = "";
		this.movesLeft = this.size*this.size;
		for (var column = 0; column < this.size; column++) {
			for (var row = 0; row < this.size; row++) {
				if (!this.grid[row])
					this.grid[row] = [];
				this.grid[row][column] = "-";
			}
		}
	}
	play(token, x, y) {
		this.gs.message = "";
		if (((this.x != this.gs.lastX) || (this.y != this.gs.lastY)) && (this.gs.lastX != -1)) {
				this.gs.message = "Bad square";
				return;
		}
		if (this.winningPlayer !== "" || this.movesLeft === 0) {
			this.active = false;
			this.gs.message = "click new game to start again";
			return;
		}
		if (this.grid[x][y] === "-") {
			this.grid[x][y] = token;
			this.winningPlayer = this.hasGameEnded();
			this.movesLeft--;
			this.gs.logLastMove(x, y);
			if (this.winningPlayer !== "" || this.movesLeft === 0)
				this.gs.message = "click new game to start again";
			this.gs.changePlayer();
		} else {
			this.gs.message = "Bad move. Choose an empty space";
		}
	}

	hasGameEnded() {
		if (this.checkLine(0, 0, [0, 1], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[0][0]);
			return this.grid[0][0];
		}
		else if (this.checkLine(1, 0, [0, 1], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[1][0]);
			return this.grid[1][0];
		}
		else if (this.checkLine(2, 0, [0, 1], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[2][0]);
			return this.grid[2][0];
		}
		else if (this.checkLine(0, 0, [1, 0], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[0][0]);
			return this.grid[0][0];
		}
		else if (this.checkLine(0, 1, [1, 0], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[0][1]);
			return this.grid[0][1];
		}
		else if (this.checkLine(0, 2, [1, 0], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[0][2]);
			return this.grid[0][2];
		}
		else if (this.checkLine(0, 0, [1, 1], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[0][0]);
			return this.grid[0][0];
		}
		else if (this.checkLine(0, 2, [1, -1], this.size)) {
			this.gs.logVictory(this.x, this.y, this.grid[0][2]);
			return this.grid[0][2];
		}
		return "";
	}
	checkLine(x, y, vector, size) {
		var startingValue = this.grid[x][y];
		if (startingValue === "-")
			return false;
		for (var i = 0; i < size - 1; i++) {
			x = x + vector[0];
			y = y + vector[1];
			if (startingValue !== this.grid[x][y])
				return false;
		}
		return true;
	}
}