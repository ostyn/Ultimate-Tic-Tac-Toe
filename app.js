export class App {
    constructor() {
    }
 
	activate() {
	}
	configureRouter(config, router){
		config.title = 'Testering';
		config.map([
		  { route: ['','home'], name: 'home', moduleId: 'Home', nav: true, title:'Home' },
		  { route: ['page/:id'], name: 'page', moduleId: 'Page', nav: false, title:'page' },
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