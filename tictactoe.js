export class TicTacToe {
	constructor() {
		this.size = 3;
		this.activeToken = 'O'
		this.grid = [];
		this.gameOver = false;
		for(var column = 0; column < this.size; column++) {
			for(var row = 0; row < this.size; row++) {
				if(!this.grid[row])
					this.grid[row] = [];
				this.grid[row][column] = "";
			}
		}
	}
	play(token, x, y) {
		this.grid[x][y] = token;
		this.gameOver = this.hasGameEnded();
	}
	activePlayer() {
		if(this.activeToken === 'X')
			this.activeToken = 'O'
		else
			this.activeToken = 'X'
		return this.activeToken;
	}
	hasGameEnded() {
		if(this.checkLine(0, 0, [0,1], this.size))
			return true;
		else if(this.checkLine(1, 0, [0,1], this.size))
			return true;
		else if(this.checkLine(2, 0, [0,1], this.size))
			return true;
		else if(this.checkLine(0, 0, [1,0], this.size))
			return true;
		else if(this.checkLine(0, 1, [1,0], this.size))
			return true;
		else if(this.checkLine(0, 2, [1,0], this.size))
			return true;
		else if(this.checkLine(0, 0, [1,1], this.size))
			return true;
		else if(this.checkLine(0, 2, [1,-1], this.size))
			return true;
		return false;
	}
	checkLine(x, y, vector, size){
		var startingValue = this.grid[x][y];
		if(startingValue === "")
			return false;
		for(var i = 0; i < size-1; i++) {
			x = x + vector[0];
			y = y + vector[1];
			if(startingValue !== this.grid[x][y])
				return false;
		}
		return true;
	}
}