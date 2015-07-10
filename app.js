export class App {
    constructor() {
        this.message = "";
		this.greeting = true;
    }
 
    activate() {
        this.message = "Hello, World!";
    }
 
    changeMessage() {
		if (this.greeting)
			this.message = "Goodbye!";
		else
			this.activate();
		this.greeting = !this.greeting;
    }
 
}