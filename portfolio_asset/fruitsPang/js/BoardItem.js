

class BoardItem {

	constructor (element, x,y ) {
		this.element = $(element).appendTo("#game-board-items");
		this.x = x;
		this.y = y;

		this.element.css({
			left : Config.fruitsLeft[this.x],
			top : -(Config.fruitsTop[Config.fruitsTop.length-1-this.y] + 80)
		});

		return this;
	}

	getArround (baseData = null) {
		if (!baseData) {
			baseData = CurGame.data;
		}

		return {
			bottom : baseData[this.x][this.y+1],
			top : baseData[this.x][this.y-1],
			left : baseData[this.x-1] == undefined ? undefined : baseData[this.x-1][this.y],
			leftTop : baseData[this.x-1] == undefined ? undefined : baseData[this.x-1][this.y-1],
			leftBot : baseData[this.x-1] == undefined ? undefined : baseData[this.x-1][this.y+1],
			right : baseData[this.x+1] == undefined ? undefined : baseData[this.x+1][this.y],
			rightTop : baseData[this.x+1] == undefined ? undefined : baseData[this.x+1][this.y-1],
			rightBot : baseData[this.x+1] == undefined ? undefined : baseData[this.x+1][this.y+1]
		}
	}

	refreshPos () {
		this.element.css({
			left : Config.fruitsLeft[this.x],
			top : Config.fruitsTop[this.y]
		});
	}

	destroy () {
		this.element.addClass('remove');

		$.each(CurGame.data[this.x], (a, b) => {
			if (b != undefined && b.y < this.y) {
				b.y += 1;
			}
		});

		setTimeout(() => {
			this.element.removeClass('remove').remove();
			// delete CurGame.data[this.x][this.y];
		}, 450);
		
		CurGame.score += 100;

		this.remove = 1;
	}

	impossibleSwap (arrow) {

	}

	swap (arrow, isLast = 0) {
		let around = this.getArround();
		dd(around, arrow);

		if (around[arrow] == undefined) { // 스왑할것이 없을때의 행동
			this.impossibleSwap(arrow);
		} else { // 스와핑
			let temp = around[arrow];

			[CurGame.data[this.x][this.y], CurGame.data[temp.x][temp.y]] = [temp, this];
			[this.x, this.y, around[arrow].x, around[arrow].y] = [around[arrow].x, around[arrow].y, this.x, this.y];
			
			// CurGame.GameBoarder.pangChk().then(() => {
			// 	dd(CurGame.GameBoarder.removeTemp);
			// });
			CurGame.GameBoarder.inLoop().then((isPang) => {
				if (!isPang && !isLast) {
					temp.swap(arrow, 1);
					// this.swap(flipArrow(arrow));
					// [CurGame.data[this.x][this.y], CurGame.data[temp.x][temp.y]] = [temp, this];
					// [this.x, this.y, around[arrow].x, around[arrow].y] = [around[arrow].x, around[arrow].y, this.x, this.y];
				}
			});
		}
	}


}