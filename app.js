export class App {
    constructor() {
        this.message = "";
		this.greeting = true;
		this.items = [];
		for(var i = 0; i<=1000; i++)
			this.items.push(i);
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