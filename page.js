import {HttpClient} from 'aurelia-http-client';
export class Page {
	static inject = [HttpClient];
	constructor(http){
        this.http = http;
    }
	activate(params){
		return this.http.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count='+params.id)
		.then(values => this.text = values.response);
	}
}