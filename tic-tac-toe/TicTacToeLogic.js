export class TicTacToeLogic {
	static generateBoard(size){
		var grid = [];
		for (var column = 0; column < size; column++) {
			for (var row = 0; row < size; row++) {
				if (!grid[row])
					grid.splice(row, 1, []);
				grid[row].splice(column, 1, "-");
			}
		}	
		return grid;
	}

	static hasGameEnded(size, grid) {
		//Columns
		for(var i = 0; i < size; i++) {
			var check = TicTacToeLogic.checkLine(i, 0, [0, 1], size, grid);
			if (check !== "-") {
				return check;
			}
		}
		//Rows
		for(var i = 0; i < size; i++) {
			var check = TicTacToeLogic.checkLine(0, i, [1, 0], size, grid);
			if (check !== "-") {
				return check;
			}
		}
		//Diagonals
		if (size % 2 === 1) {
			var diagonal1 = TicTacToeLogic.checkLine(0, 0, [1, 1], size, grid);
			var diagonal2 = TicTacToeLogic.checkLine(0, size-1, [1, -1], size, grid);
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

	static checkLine(x, y, vector, size, grid) {
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