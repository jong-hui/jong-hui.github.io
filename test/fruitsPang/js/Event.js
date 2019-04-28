
class Event {

	constructor (GameObject) {
		this.hook();
	}

	hook () {

		on("click", "#btn-start", function() {
			CurGame.GameStart();
		});

		on("click", "#game-board-items > div", function() {
			CurGame.activeThisItem($(this).data('id'));
		});

		on("keydown", document, function(e) {
			if (CurGame.activeItem && CurGame.timerInterval.status && CurGame.activeItem.element.length && CurGame.activeItem.val.remove != 1) {
				// 37, 38, 39, 40
				dd(CurGame.activeItem);
				CurGame.activeItem.val.swap(getArrowFromKeyCode(e.keyCode));
			}
		});

	}

}