export class App {
    constructor() {
    }
 
	activate() {
	}
	configureRouter(config, router){
		config.title = 'Testering';
		config.map([
		  { route: ['','home'], name: 'home', moduleId: 'home/Home', nav: true, title:'Home' },
		  { route: ['cards/:id'], name: 'cards', moduleId: 'cards/Cards', nav: false, title:'cards' },
		  { route: ['tic-tac-toe'], name: 'tic-tac-toe-test', moduleId: 'tic-tac-toe/TicTacToeTest', nav: true, title:'Tic-Tac-Toe Test' },
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