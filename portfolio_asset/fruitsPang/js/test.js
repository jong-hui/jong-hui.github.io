
/*
var TestClass1 = class isClass {

	constructor () {
		console.log("TestClass1's constructor");
		this.num = 1;
		this.init();
		this.sum();
	}

	sum () {
		console.log(this);
		console.log(this.num + 1);
	}

	init () {
		console.log("TestClass1's init");
	}

	ohmy () {
		console.log("god!");
	}
}


class TestClass2 extends TestClass1 {

	constructor () {
		super();
		console.log("TestClass2's constructor");

		this.num = 2;
		this.init();
		this.sum();
	}

	init () {
		console.log("TestClass2's init");
	}

}

class TestClass3 extends TestClass2 {

	constructor () {
		super();
		console.log("TestClass3's constructor");

		this.num = 3;
		this.init();
		this.sum();
	}

	static init () {
		console.log("TestClass3's init");
	}

	specialMethod () {

	}

}

var TestObject2 = function() {

}
TestObject2.prototype.init = function() {
	console.log("TestObject2's init");
}

var TestObject3 = function() {
	this.__proto__.__proto__ = TestObject2.prototype;

	this.asd = function() {
		console.log("asd");
	}
}

TestObject3.prototype.specialMethod = function() {

}

TestObject2.prototype.init = function() {
	console.log("TestObject2's change init");
}


var t1 = new TestClass3();
var t2 = new TestClass3();
var t3 = new TestObject3();

// t3.__proto__.__proto__ = TestObject2.prototype;



console.dir(t1);
console.dir(TestClass3);
console.dir(t3.init());
*/

function Animal () {

}

Animal.prototype.bark = function () {
	console.log(this.barkSound);
}
Animal.prototype.getName = function () {
	console.log(this.animalName);
}

function dog () {
	this.__proto__.__proto__ = Animal.prototype;

	this.barkSound = "bowwow";
	this.animalName = "dog";
}


var volt = new dog();

console.log( volt.toString() ); // Uncaught TypeError
// console.dir(volt);