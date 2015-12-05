export class GS {
	constructor(prevGameState) {
		this.size = 3;
		if(prevGameState)
			this.generateNextGameState(prevGameState);
		else
			this.createNewGameState()
	}
	generateNextGameState(prevGameState){
		this.grid = JSON.parse(JSON.stringify(prevGameState.grid)); //TODO better copy
	}
	createNewGameState(){
		this.grid = [];
		for (var column = 0; column < this.size; column++) {
			for (var row = 0; row < this.size; row++) {
				if (!this.grid[row])
					this.grid.splice(row, 1, []);
				this.grid[row].splice(column, 1, "-");
			}
		}
	}
	setLastMove(x, y, piece) {
		this.lastMove = {"x" : x, "y" : y, "piece" : piece};//switch to deconstruction?
	}
}