export class TurnObject {
	constructor(){
		this.reset();
	}

	advancePlayerTurn(){
		this.tokens.push(this.tokens.shift());
	}

	reversePlayerTurn(){
		this.tokens.unshift(this.tokens.pop());
	}

	getCurrentPlayer(){
		return this.tokens[0];
	}

	reset() {
		this.tokens = ["X", "O"];
	}
	
}