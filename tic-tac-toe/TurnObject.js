export class TurnObject {
	constructor(){
		this.tokens = ["X", "O"];
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
	
}