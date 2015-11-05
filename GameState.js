export class GameState {
	constructor() {
		this.size = 3;
		this.grid = [];
		this.lastX = -1;
		this.lastY = -1;
		this.activeToken = 'O';
		this.message = "";
		for (var column = 0; column < this.size; column++) {
				for (var row = 0; row < this.size; row++) {
					if (!this.grid[row])
						this.grid.splice(row, 1, []);
					this.grid[row].splice(column, 1, "-");
				}
		}
	}
	logLastMove(x, y){
		this.lastX = x;
		this.lastY = y;
		if(this.grid[x][y] != "-") {
			this.lastX = -1;
			this.lastY = -1;
		}	
	}
	logVictory(x, y, piece){
		this.grid[x].splice(y, 1, piece);
		if (this.hasGameEnded() !== "-") {
			this.lastX = this.size+1;
			this.lastY = this.size+1;
		}
	}
	changePlayer() {
		if (this.activeToken === 'X')
			this.activeToken = 'O'
		else
			this.activeToken = 'X'
	}
	getPlayer() {
		return this.activeToken;
	}
	hasGameEnded() {
		//Columns
		for(var i = 0; i < this.size; i++) {
			if (this.checkLine(i, 0, [0, 1], this.size)) {
				this.message = this.grid[i][0] + " has won!"
				return this.grid[i][0];
			}
		}
		//Rows
		for(var i = 0; i < this.size; i++) {
			if (this.checkLine(0, i, [1, 0], this.size)) {
				this.message = this.grid[0][i] + " has won!"
				return this.grid[0][i];
			}
		}
		//Diagonals
		if (this.size % 2 === 1) {
			if (this.checkLine(0, 0, [1, 1], this.size)) {
				this.message = this.grid[0][0] + " has won!"
				return this.grid[0][0];
			}
			else if (this.checkLine(0, this.size-1, [1, -1], this.size)) {
				this.message = this.grid[0][this.size-1] + " has won!"
				return this.grid[0][this.size-1];
			}
		}
		return "-";
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