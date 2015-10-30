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
						this.grid[row] = [];
					this.grid[row][column] = "-";
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
		this.grid[x][y] = piece;
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
	isBoardActive(x, y){
		return ((x == this.lastX) && (y == this.lastY)) || (this.lastX == -1)
	}
}