export class TicTacToe {
	constructor() {
		this.size = 3;
		this.newGame();
		this.movesLeft = this.size*this.size;
	}
	newGame() {
		this.message = "";
		this.activeToken = 'O'
		this.grid = [];
		this.winningPlayer = "";
		for (var column = 0; column < this.size; column++) {
			for (var row = 0; row < this.size; row++) {
				if (!this.grid[row])
					this.grid[row] = [];
				this.grid[row][column] = "";
			}
		}
	}
	play(token, x, y) {
		this.message = "";
		if (this.winningPlayer !== "" || this.movesLeft === 0) {
			this.message = "click new game to start again";
			return;
		}
		if (this.grid[x][y] === "") {
			this.grid[x][y] = token;
			this.winningPlayer = this.hasGameEnded();
			this.movesLeft--;
			if (this.winningPlayer !== "" || this.movesLeft === 0)
				this.message = "click new game to start again";
		} else {
			this.message = "Bad move. Choose an empty space";
			this.activePlayer();
		}
	}
	activePlayer() {
		var active = this.activeToken;
		if (this.activeToken === 'X')
			this.activeToken = 'O'
		else
			this.activeToken = 'X'
		return active;
	}
	hasGameEnded() {
		if (this.checkLine(0, 0, [0, 1], this.size))
			return this.grid[0][0];
		else if (this.checkLine(1, 0, [0, 1], this.size))
			return this.grid[1][0];
		else if (this.checkLine(2, 0, [0, 1], this.size))
			return this.grid[2][0];
		else if (this.checkLine(0, 0, [1, 0], this.size))
			return this.grid[0][0];
		else if (this.checkLine(0, 1, [1, 0], this.size))
			return this.grid[0][1];
		else if (this.checkLine(0, 2, [1, 0], this.size))
			return this.grid[0][2];
		else if (this.checkLine(0, 0, [1, 1], this.size))
			return this.grid[0][0];
		else if (this.checkLine(0, 2, [1, -1], this.size))
			return this.grid[0][2];
		return "";
	}
	checkLine(x, y, vector, size) {
		var startingValue = this.grid[x][y];
		if (startingValue === "")
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