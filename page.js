import {HttpClient} from 'aurelia-http-client';
import {Deck} from 'Deck';
export class Page {
	static inject = [HttpClient];
	constructor(http){
		this.deck = new Deck(http);
		this.drawnCards = [];
    }
	activate(params){
	}
	draw(numberOfCards){
		this.deck.drawCards(numberOfCards)
			.then(values => this.drawnCards[this.drawnCards.length] = JSON.parse(values.response));
	}
	shuffle(){
		//todo
		return;
	}
}