export class Deck {
	constructor(http, numberOfDecks=1){
		this.http = http;
		this.id = this.http.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=' + numberOfDecks)
		.then(values => this.id = JSON.parse(values.response).deck_id);
	}
	drawCards(number){
		return this.http.get('http://deckofcardsapi.com/api/deck/'+this.id+'/draw/?count='+number);

	}
	shuffle(){
		return this.http.get('http://deckofcardsapi.com/api/deck/'+this.id+'/shuffle/');
	}
}