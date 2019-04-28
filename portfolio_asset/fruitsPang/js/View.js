

class View {

	constructor () {
		this.page = 0;
		this.loadStart();

		this.init().then(() => {

			this.loadEnd();
		});

		return this;
	}

	async init () {

		await this.svgInit();
		this.gameBoardInit();
	}

	loadStart () {

	}

	loadEnd () {

		$("#loading").remove();
		$("#wrap").removeClass('loading');

		CurGame.Eventer = new Event();

	}

	svgInit () {

		let svg$ = $("[data-svg-name]");
		let promiseArray = [];

		svg$.each((a, b) => {
			let url = `/portfolio_asset/fruitsPang/imgs/${$(b).data('svg-name')}`;

			promiseArray.push( $.ajax({ url : url }));
		});

		return Promise.all(promiseArray).then((e) => {
			// $(e).combine("find", Array(e.length).fill('svg'))
			svg$.combine("prepend",  e.map((v) => $(v).find('svg')));

		});
	}

	gameBoardInit () {
		$("#game-timer-svg").prepend("<div class='progress'> <div> <img src='/portfolio_asset/fruitsPang/imgs/bar-top.png' /> </div> </div>");
	}

	changePage (curPage) {
		$("#inner > div").eq(this.page).removeClass('active').addClass('prev');
		$("#inner > div").eq(curPage).removeClass('prev').addClass('active');

		this.page = curPage;
	}

}