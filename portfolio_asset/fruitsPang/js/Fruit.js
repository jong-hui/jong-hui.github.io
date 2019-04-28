

class Fruit extends BoardItem {

	constructor (x, y) {
		let fruitId = rand(0, Config.fruits.length);
		let id = Date.now()+(idx++);
		let item = super(`<div class="item" data-id="${id}"> <img src="imgs/${Config.fruitsSrc[fruitId]}" alt="fruit" /> </div>`, x, y);

		this.x = x;
		this.y = y;
		this.fruitId = fruitId;
		this.fruitName = Config.fruits[this.fruitId];
		this.fruitSrc = Config.fruitsSrc[this.fruitId];
		this.id = id;
		this.item = item;

		// this.standBy();
	}

}