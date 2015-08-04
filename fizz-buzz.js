export class fizzBuzzValueConverter {
	fizzBuzz(number) {
		if(number%3===0 && number%5===0)
			return "FizzBuzz";
		else if(number%3===0)
			return "Fizz";
		else if(number%5===0)
			return "Buzz";
		return undefined;
	}
	toView(number) {
		var text = this.fizzBuzz(number);
		return (text)? number + " - " + text : undefined;
	}
}