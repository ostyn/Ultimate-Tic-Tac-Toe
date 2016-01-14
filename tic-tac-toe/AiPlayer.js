export class AiPlayer {
	constructor(token) {
		this.token = token;
		this.isAi = true;
	}
	getMove(gs) {
		for(let colIndex in gs.grid) {
			for(let rowIndex in gs.grid[colIndex]) {
				if(gs.grid[colIndex][rowIndex] === "-")
					return {x: colIndex, y: rowIndex, token: this.token};
			}
		}
	}
}