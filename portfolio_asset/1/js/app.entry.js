dd = console.log;
// slide animation
function slide (arrow) {
	if (arrow == "left") {
		return function() {
			if (isSlide) {
				return false;
			}
			var rap = $(".slide-wrap > div");
			isSlide = 1;

			rap.css({
				marginLeft : '-200px',
				transition : '0s'
			});
			rap.find('article:last-child').prependTo(rap);

			setTimeout(function() {
				rap.css({
					marginLeft : '0px',
					transition : '0.5s'
				});
				setTimeout(function() {
					isSlide = 0;
				}, 500)
			})
		}
	} else {
		return function() {
			if (isSlide) {
				return false;
			}
			var rap = $(".slide-wrap > div");
			isSlide = 1;

			rap.css({
				marginLeft : '-200px',
				transition : '0.5s'
			});

			setTimeout(function() {
				rap.css({
					marginLeft : '0px',
					transition : '0s'
				});
				rap.find('article:first-child').appendTo(rap);
				isSlide = 0;
			}, 500)
		}
	}
}

// tab menu
function tabView () {
	$(`<style>
		article.active {
			animation : article 1s;
		}
		@keyframes article {
			0% {
				opacity: 0;
				transform : translateY(100px);
			}
		}
	</style>`).appendTo('head');
}

// application init
function init () {
	isSlide = 0;
	tabView();
	Animation.init()
	Navigation.init()
	Layer.init()
	Path.init()
}

// event register
$(init)
	.on("click", "a", function(e) {
		e.preventDefault();
	})
	.on('click', '.toMain', Navigation.goToMain)
	.on('click', '.site-menu li', Navigation.goToPage)
	.on('click', '.arrow a', Navigation.goToArrow)
	.on('click', '.sub02 article, .sub03 article', Layer.htmlOpen)
	.on('click', 'body > div > section.sub.active > div.page > section.sub02.active > div.content-wrap.travel > a.slide-arrow.ani.l2r.left.reverse.type', slide('left'))
	.on('click', 'body > div > section.sub.active > div.page > section.sub02.active > div.content-wrap.travel > a.slide-arrow.ani.r2l.right.reverse.type', slide('right'))
	.on('click', 'body > div > section.sub.active > div.page > section.sub02.active > div.content-wrap.travel-path > form > fieldset > div.btn_wrap > button.btn.ani.r2l.default.big.time-table.reverse.type', Path.open)
	.on('click', '.closer', Layer.close)
	.on('submit', 'form', Path.submit)
	.on('keydown', function(e) {
		if (e.keyCode == 27) {
			Layer.close();
		}
	})
	.on('click', '.tab li', function() {
		var idx = $(this).index();

		$(".tab li a").removeClass('active');
		$(".tab li").eq(idx).find('a').addClass('active');
		$(".tab-content article").removeClass('active').eq(idx).addClass('active');
	})