import {inject} from 'aurelia-framework';
import {GameState} from './GameState'
@inject(GameState)
export class Home {
	constructor(gs) {
		this.gs = gs;
	}
}