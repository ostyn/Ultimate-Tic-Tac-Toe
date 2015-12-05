export class GameState {
	constructor() {
		this.reset();
	}

	reset() {
		this.size = 3;
		this.grid = [];
		this.lastX = -1;
		this.lastY = -1;
		this.gameOver = false;
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
		if(this.grid[x][y] !== "-") {
			this.lastX = -1;
			this.lastY = -1;
		}	
	}
	logVictory(x, y, piece){
		this.grid[x].splice(y, 1, piece);
		var potentialWinner = this.hasGameEnded(this.size, this.grid);
		if (potentialWinner !== "-") {
			this.gameOver = true;
			this.lastX = this.size+1;
			this.lastY = this.size+1;
			this.message = "The game is over and " + potentialWinner + " won!";
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
}