import {inject} from 'aurelia-framework';
import {GameState} from 'tic-tac-toe/GameState'
@inject(GameState)
export class UltimateTicTacToe {
	constructor(gs) {
		this.gs = gs;
	}
	activate(){
		this.gs.reset();
	}
}