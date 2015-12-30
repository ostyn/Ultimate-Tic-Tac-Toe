import {TicTacToeLogic} from 'tic-tac-toe/TicTacToeLogic'
export class GameState {
	constructor(size, prevGameState) {
		this.size = size;
		this.grid = [];
		if(prevGameState)
			this.generateNextGameState(prevGameState);
		else
			this.grid = TicTacToeLogic.generateBoard(this.size);
	}

	generateNextGameState(prevGameState){
		this.grid = JSON.parse(JSON.stringify(prevGameState.grid)); //TODO better copy
	}

	setLastMove(x, y, piece) {
		this.lastMove = {"x" : x, "y" : y, "piece" : piece};//switch to deconstruction?
	}
}