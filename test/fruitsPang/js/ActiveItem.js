

class ActiveItem {
	constructor (id) {
		multi(CurGame.data, (a, b) => {
			if (b.id == id) {
				this.val = b;
			}
		});
		this.element = this.val.element; // $(".item[data-id="+id+"]");

		this.element.addClass('active');
	}

	off () {
		this.element.removeClass('active');
	}
}