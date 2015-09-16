import {HttpClient} from 'aurelia-http-client';
import {Deck} from 'Deck';
export class Page {
	static inject = [HttpClient];
	constructor(http){
		this.deck = new Deck(http);
		this.drawnCards = [];
		this.text = "Ewoks!";
    }
	draw(numberOfCards){
		this.deck.drawCards(numberOfCards)
			.then(
				values => this.drawnCards = this.drawnCards.concat(JSON.parse(values.response).cards)
			);
	}
	shuffle(){
		//todo
		return;
	}
}