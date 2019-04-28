// page class
class Navigation {

	// instance Constructor
	constructor () { }

	// set static variable
	static init () {

		// jQuery selector minimization
		var url = new URL(location.href);
		Navigation.main    = $('.main');
		Navigation.sub     = $('.sub');
		Navigation.page    = $('.page');
		Navigation.gnb     = $('.gnb');
		Navigation.len     = Navigation.gnb.find('li').length;
		Navigation.section = Navigation.page.find('>section');
		Navigation.nowPage = url.searchParams.get("page") == undefined ? -1 : url.searchParams.get("page")*1;
		Navigation.is = 0;

		if (Navigation.nowPage == -1) {
			new Animation({
				obj : $(".main, .arrow")
			});
		} else {
			$(".main").removeClass('active');
			$(".sub").addClass("active");
			Navigation.section.eq(Navigation.nowPage).addClass('active');
			new Animation({
				obj : $(".arrow, .sub-default, .page > section:eq("+Navigation.nowPage+")")
			})
		}
	}

	// go to main page
	static goToMain () {
		if (Navigation.is) {
			return false;
		}
		Navigation.is = 1;

		new Animation({
			obj : Navigation.sub,
			reverse : true,
			cb : function() {
				Navigation.sub.fadeOut(500, function() {
					Navigation.sub.removeClass('active')
					Navigation.page.find('>section.active').removeClass('active')
					Navigation.main.addClass('active');
					Navigation.main.fadeIn(500, function() {
						Navigation.change(-1);
						setTimeout(function() {
							Navigation.is = 0;
						}, 300);
						new Animation({
							obj : Navigation.main
						})
					})
				})
			}
		})
	}

	// go to selected sub page
	static goToPage () {
		Navigation.goToPageReal($(this).index())
	}

	// site page change
	static change (num) {
		Navigation.nowPage = num;
		Navigation.is = 1;
		history.pushState("", "여수시 전자카탈로그", "?page="+num);
	}

	// go to page
	static goToPageReal (num) {
		if (Navigation.is) {
			return false;
		}
		Navigation.is = 1;
		// variable set
		const main = Navigation.main,
			  sub  = Navigation.sub,
			  page = Navigation.page,
			  gnb  = Navigation.gnb,
			  sec = Navigation.section,
			  prev = page.find('>section.active');

		var pageSet = function(before, after, cur) {
			before.fadeOut(500, function() {
				Navigation.change(num);
				before.removeClass('active');
				after.addClass('active');
				page.find('>section').hide().removeClass('active').eq(num).addClass('active').show();
				gnb.find('li').removeClass('active').eq(num).addClass('active');

				after.fadeIn(500, function() {
					setTimeout(function() {
						Navigation.is = 0;
					}, 300);
					new Animation({
						obj : cur
					});
				});
			});
		}
		if (Navigation.nowPage == -1) {
			// main.removeClass('active')
			// sub.addClass('active')

			new Animation({
				obj : $(".main"),
				reverse : true,
				cb : function() {
					var toker = $(".page > section:eq("+num+")");
					Animation.tok(toker, false);
					Animation.tok($(".sub-default"), false);
					setTimeout(() => {
						new Animation({
							obj : $(".sub-default"),
							none : true
						})
					}, 500);
					pageSet(main, sub, toker);
				}
			})
		} else {
			new Animation({
				obj : prev,
				reverse : true,
				cb : function() {
					pageSet(prev, sec.eq(num), sec.eq(num));
				}
			})
		}

		Navigation.nowPage = num
	}

	// go to selected sub page
	static goToArrow () {
		// variable set 
		const _this = $(this),
		      len   = Navigation.len
		let   num   = Navigation.nowPage

		num = _this.hasClass('left') ? num - 1 : num + 1
		if (num == -1 || num >= len) {
			Navigation.goToMain()
			return
		} else if (num < -1) {
			num = len - 1
		}
		Navigation.goToPageReal(num)
	}
}