import {inject} from 'aurelia-framework';
import {GameState} from './GameState'
@inject(GameState)
export class UltimateTicTacToe {
	constructor(gs) {
		this.gs = gs;
	}
}