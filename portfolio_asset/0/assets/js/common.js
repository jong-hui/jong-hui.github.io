dd = console.log;


const Screen = {
	_page : 0,
	maxPage : 3,
	animated : 0,
	rect : 1,
	
	get page () {
		return this._page;
	},

	set page (_page) {
		if (_page < 0 || Screen.animated || _page+1 > Screen.maxPage) {
			return false;
		}

		[prevPage, this._page] = [this._page, _page];

		return this.refresh();
	},

	init () {
		for (let i = 1; i < Screen.maxPage+1; i++) {
			$(".page"+i).css({
				left : ((i-1)*100)+"%",
				top : ((i-1)*50)+"%"
			});
		}

		setTimeout(function() {
			$(".loading").removeClass('loading');

			setTimeout(function() {
				Screen.addDelay();

				$(".page1_typo").addClass('fades');
				$("#loading").remove();

				// Screen.refresh();
			}, 500 * Screen.rect);
		}, 500 * Screen.rect);
	},

	addDelay () {
		$("#pages > div").find(".typo > *:not(.grid)").removeAttr('style');

		$("[data-delay]").each(function() {
			$(this).css({
				'transition-delay' : $(this).data('delay')
			});
		});

		$("[data-duration]").each(function() {
			$(this).css({
				'transition-duration' : $(this).data('duration')
			});
		});
	},

	refresh () {
		Screen.animated = 1;

		let pages = $("#pages > div");
		let page = $("#pages");

		pages.css({
			'transform' : 'scale(0.8)'
		});

		pages.find(".typo > *").css({
			'transition-delay' : '0s',
			'transition' : '1s',
			'opacity' : '0'
		});

		if (Screen.page !== 2) {
			$("#app").css({
				overflow : "hidden"
			});
		}


		// $("#app").css({
		// 	overflow : Screen.page === 2 ? "visible" : "hidden"
		// });

		setTimeout(function() {
			page.css({
				left : (-(Screen.page*100))+"%",
				top : (-(Screen.page*50))+"%",
				transition : "1s"
			});

			setTimeout(function() {
				pages.css({
					'transform' : 'scale(1)'
				});

				page.css({
					transition : '0.5s'
				});

				pages.find(".typo > .grid").css({
					'opacity' : '1',
					'transition-delay' : '1s'
				});

				if (Screen.page === 2) {
					$(".grid").masonry({
						itemSelector : ".grid-item",
						columnWidth : $(window).width() / 4
					});
				}

				setTimeout(function() {
					Screen.addDelay();

					$(".page1_typo").addClass('fades');

					Screen.animated = 0;

					if (Screen.page === 2) {
						$("#app").css({
							overflow : "visible"
						});
					}
				}, 500 * Screen.rect);
			}, 1300 * Screen.rect);
		}, 800 * Screen.rect);
	},

	// true = scroll down
	scroll (bol) {
		return this[bol ? 'scrollDown' : 'scrollUp']();
	},

	scrollDown () {
		this.page++;
	},

	scrollUp () {
		this.page--;
	}
}



const App = {
	initData : [
		{
			title : "개인 개발 블로그",
			link : "https://jong-hui.github.io/",
			img : "/portfolio_asset/0/portfolio/1/캡처.PNG"
		},
		{
			title : "깃허브",
			link : "https://github.com/jong-hui",
			img : "/portfolio_asset/0/portfolio/2/캡처.PNG"
		},
		{
			title : "Fruits Pang 게임",
			link : "https://jong-hui.github.io/fruitsPang",
			img : "/portfolio_asset/0/portfolio/4/캡처.PNG"
		},
		{
			title : "여수 소개페이지 앱 (대회과제)",
			link : "https://jong-hui.github.io/portfolio_1",
			img : "/portfolio_asset/0/portfolio/3/캡처.PNG"
		},
		{
			title : "여수 지도 앱 (대회과제)",
			link : "https://jong-hui.github.io/portfolio_2",
			img : "/portfolio_asset/0/portfolio/5/캡처.PNG"
		},
		{
			title : "제주 아트 센터 페이지 (대회과제)",
			link : "https://jong-hui.github.io/portfolio_3",
			img : "/portfolio_asset/0/portfolio/6/캡처.PNG"
		}
	],

	init () {
		$.each(App.initData, function(key, data) {
			$(".grid").append(`
				<div class="grid-item" onClick="window.open('${data.link}', '_blank')">
					<div class="port_img">
						<img src="${data.img}" alt="port" title="port">
					</div>
					<div class="port_text">
						<h4>
							${data.title}
						</h4>
					</div>
				</div>
			`);
		});

		App.hook();
		Screen.init();
	},

	hook () {

		$(window).on("mousewheel", function(e) {
			if (Screen.page === 2 && $(window).scrollTop() !== 0) {
				return false;
			}
			Screen.scroll(e.originalEvent.deltaY > 0);
		});

		$(window).on("keydown", function(e) {
			if (e.keyCode === 40 || e.keyCode === 38) {
				Screen.scroll(e.keyCode === 40);
			}
		});

		$(".more_story").on("click", function() {
			Screen.page++;
		});
	}
}


$(function() {
	setTimeout(function() {
		App.init();
	}, 5000);
});