export class TicTacToe {
	constructor() {
		var size = 3;
		this.grid = [];
		for(var column = 0; column < size; column++) {
			for(var row = 0; row < size; row++) {
				if(!this.grid[row])
					this.grid[row] = [];
				this.grid[row][column] = row + ', ' + column;
			}
		}
	}
	play(token, x, y) {
		this.grid[x][y] = token;
	}
}