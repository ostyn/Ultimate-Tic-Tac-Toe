import {HttpClient} from 'aurelia-http-client';
export class Deck {
	static inject = [HttpClient];
	constructor(http){
		this.http = http;
		return this.http.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
		.then(values => this.id = values.response.deck_id);
	}
	getCards(number){
		return this.http.get('http://deckofcardsapi.com/api/deck/'+this.id+'/draw/?count='+number);
	}
}