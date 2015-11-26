import {customElement, bindable, inject} from 'aurelia-framework';
import {GameState} from 'tic-tac-toe/GameState'
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
	get isBoardInactive() {
		return !(((this.x == this.gs.lastX) && (this.y == this.gs.lastY)) || (this.gs.lastX == -1));
	}
	newGame() {
		this.grid = [];
		this.winningPlayer = "-";
		this.movesLeft = this.size*this.size;
		for (var column = 0; column < this.size; column++) {
			for (var row = 0; row < this.size; row++) {
				if (!this.grid[row])
					this.grid.splice(row, 1, []);
				this.grid[row].splice(column, 1, "-");
			}
		}
	}
	play(x, y, token) {
		this.gs.message = "";
		if (this.isBoardInactive) {
				this.gs.message = "Bad square";
				return;
		}
		if (this.winningPlayer !== "-" || this.movesLeft === 0) {
			this.gs.message = "click new game to start again";
			return;
		}
		if (this.grid[x][y] === "-") {
			this.grid[x].splice(y, 1, token);
			this.movesLeft--;
			this.winningPlayer = this.gs.hasGameEnded(this.size, this.grid);
			if(this.winningPlayer !== "-")
				this.gs.logVictory(this.x, this.y, this.winningPlayer);
			this.gs.logLastMove(x, y);
			this.gs.changePlayer();
		} else {
			this.gs.message = "Bad move. Choose an empty space";
		}
	}
}