import {AiPlayer} from 'tic-tac-toe/AiPlayer'
import {Player} from 'tic-tac-toe/Player'
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

	getCurrentPlayerToken(){
		return this.tokens[0].token;
	}
	
	getCurrentPlayer(){
		return this.tokens[0];
	}

	reset() {
		this.tokens = [new Player("X"), new AiPlayer("O")];
	}
	
}