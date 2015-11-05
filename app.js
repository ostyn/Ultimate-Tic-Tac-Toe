export class App {
    constructor() {
    }
 
	activate() {
	}
	configureRouter(config, router){
		config.title = 'Testering';
		config.map([
		  { route: ['','home'], name: 'home', moduleId: 'Home', nav: true, title:'Home' },
		  { route: ['cards/:id'], name: 'cards', moduleId: 'Cards', nav: false, title:'cards' },
		  { route: ['ultimateTTT'], name: 'ultimateTicTacToe', moduleId: 'UltimateTicTacToe', nav: true, title:'Ultimate Tic-Tac-Toe' },
		]);

		this.router = router;
	}
}
class Link {
	constructor(title, url) {
			this.title = title;
			this.url = url;
		}
}