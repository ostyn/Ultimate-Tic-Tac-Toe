export class GameState {
	constructor() {
		this.reset();
	}

	reset() {
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
		var potentialWinner = this.hasGameEnded(this.size, this.grid);
		if (potentialWinner !== "-") {
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