// write your code
dd = console.log;
ls = localStorage;
animation = '';
stars = [];

/*
	페이지 리프레쉬 시에도 데이터 유지
*/
if (ls['zoom'] == undefined) {
	ls['zoom'] = 0;
}
if (ls['x'] == undefined) {
	ls['x'] = 0;
}
if (ls['y'] == undefined) {
	ls['y'] = 0;
}
if (ls['star'] == undefined) {
	ls['star'] = '';
	localSave();
}

/*
	페이지 제작을 위한 프로토타입과 함수들
*/
$.fn.getStyle = function(style) {
	return parseInt(this.css(style));
}

/*
	이차원 배열 each
*/
function dual(arr, col, cb) {
	$.each(arr, function(a, b) {
		$.each(b[col], cb);
	});
}

function localLoad() {
	stars = JSON.parse(ls['star']);
}

function localSave() {
	ls['star'] = JSON.stringify(stars);
}

localLoad();


/*
	맵(메인과 미니) 오브젝트
*/
const Maper = function($el) {
	var self = this;
	this.type = $el.hasClass('main__map');
	this.w = this.x = this.y = this.h = 0;
	this.c = $el[0];
	this.ctx = this.c.getContext('2d');
	this.hold = false;
	this.ori = {};
	this.image = {};

	this.get = function() {
		var nowWidth = $el.getStyle("width");
		var nowHeight = $el.getStyle("height");

		if (nowWidth != self.w || nowHeight != self.h) {
			self.c.width = self.w = nowWidth;
			self.c.height = self.h = nowHeight;

			Map.mapDraw();
		}
	}

	this.inner = function() {
		if (self.x < 0) {
			self.x = 0;
		}
		if (self.y < 0) {
			self.y = 0;
		}
		if (self.x+self.w > self.image.w) {
			self.x = self.image.w-self.w;
		}
		if (self.y+self.h > self.image.h) {
			self.y = self.image.h-self.h;
		}
	}

	if (this.type) {
		$(document).on({
			mousedown (e) {
				if (animation) {
					animation.stop();
				}
				self.ori = {
					x : e.pageX + self.x,
					y : e.pageY + self.y
				};
				self.hold = true;
			},
			"mouseup" () {
				self.hold = false;
			},
			mousemove (e) {
				e.preventDefault();

				if (self.hold) {
					ls['x'] = self.x = self.ori.x - e.pageX;
					ls['y'] = self.y = self.ori.y - e.pageY;

					Map.mapDraw();
				}
			},

		});
		$el.on({
			mousewheel (e) {
				self.hold = false;
				var type = e.originalEvent.deltaY < 0; // 위로 올렷을때 true
				if (type) {
					if (Map.zoom > Map.img.length-2) {
						return false;
					}
					Map.zoom++;
				} else {
					if (Map.zoom == 0) {
						return false;
					}
					Map.zoom--;
				}
				Map.zommer(e);
			}
		})
	} else {
		$el.on({
			mousedown (e) {
				e.stopPropagation();
				Map.main.x = ((e.offsetX / (Map.mini.w)) * (Map.main.image.w)) - ((Map.mini.navi.width/2 / Map.mini.w) * Map.main.image.w);
				Map.main.y = ((e.offsetY / (Map.mini.h)) * (Map.main.image.h)) - ((Map.mini.navi.height/2 / Map.mini.h) * Map.main.image.h);
				Map.mapDraw();
				self.hold = true;
			},
			"mouseup mouseleave" () {
				self.hold = false;
			},
			mousemove (e) {
				e.preventDefault();

				if (self.hold) {
					ls['x'] = Map.main.x = ((e.offsetX / (Map.mini.w)) * (Map.main.image.w)) - ((Map.mini.navi.width/2 / Map.mini.w) * Map.main.image.w);
					ls['y'] = Map.main.y = ((e.offsetY / (Map.mini.h)) * (Map.main.image.h)) - ((Map.mini.navi.height/2 / Map.mini.h) * Map.main.image.h);

					Map.mapDraw();
				}
			},
		});
	}

	this.get();
	setInterval(this.get, 10);
};

/*
	마커 를관리하는 오브젝트
*/
const Marker = {
	open : false,

	init () {
		$.each(Marker.data, function(a, b) {
			var li = $("<li>", {
				class : "list__ele",
				html : `
					<div class="ele__title">
						<span class="title__text">${b.name}</span>
						<i class="title__toggle fa fa-caret-down"></i>
					</div>
					<div class="ele__drop"></div>
				`,
				'data-idx' : b.idx
			});

			$.each(b.islands, function(q, w) {
				$("<div>", {
					class : "marker",
					css : {
						left : w.position.x,
						top : w.position.y,
					},
					'data-idx' : w.idx
				}).appendTo('.wrap__main');

				$(`<div class="drop__list" data-idx='${w.idx}'>
					<span class="list__title">${w.name}</span>
					<i class="list__star far fa-star" data-idx='${w.idx}'></i>
				</div>`).appendTo(li.find('.ele__drop'));
			});

			li.find('.ele__drop').hide();
			li.appendTo('.sideBar__list');
		});

		$(".favorite__drop").hide();
		Marker.stars();
	},

	refresh() {
		dual(Marker.data, "islands", function(a, b) {
			$(".marker[data-idx='"+b.idx+"']").css({
				left : (((b.position.x-10) / 2059) * Map.main.image.w) - Map.main.x,
				top : (((b.position.y-10) / 850) * Map.main.image.h) - Map.main.y,
			});
		});

		if (Marker.open !== false) {
			var data = Marker.getMarker(Marker.open);
			var mar = $(".marker[data-idx='"+Marker.open+"']");

			var marL = mar.getStyle('left');
			var marT = mar.getStyle('top');
			var h = $(".main__box").getStyle("height");
			var w = $(".main__box").getStyle("width");
			var l = marL - w/2;
			var t = marT - h - 20;
			$(".marker").removeClass('scale');
			mar.addClass('scale');

			if (data.position.x < w/2) {
				l = marL-50;
			}
			if (marT < Map.main.h/2) {
				t = marT+50;
			}
			if ((Map.main.x) + l+w > Map.main.image.w) {
				l = marL - w;
			}

			$(".main__box").css({
				'left' : l,
				'top' : t
			})

		}
	},

	animation () {
		var idx = $(this).data('idx');
		Marker.markerOpen(idx);
		data = Marker.getMarker(idx);

		var toX = ((data.position.x / 2059) * Map.main.image.w) - Map.main.w /2;
		var toY = ((data.position.y / 850) * Map.main.image.h) - Map.main.h /2;
		var oriX = Map.main.x;
		var oriY = Map.main.y;

		if (toX == oriX && toY == oriY) {
			return false;
		}

		animation = $("<div>").animate({
			i : oriX - toX
		}, {
			step (now, fx) {
				let rect = now / (oriX - toX);
				Map.main.x = oriX - (now);
				Map.main.y = oriY - ((oriY-toY)*rect);

				Map.mapDraw();
			},
			duration : 500
		})
	},

	markerOpen (idx) {
		data = Marker.getMarker(idx);
		Marker.open = idx;

		$(".main__box").show();
		$(".main__box").find('.fa-star').attr('data-idx', idx);
		$(".title__text--big").text(data.name);
		$(".box__location").text(data.location)
		$(".area__text").text(data.area+"㎢");
		$(".population__text").text(data.population);
		$(".box__note").text(data.note);
		$(".box__img").attr('src', data.img);

		Marker.refresh();
	},

	openMarker() {
		Marker.markerOpen($(this).data('idx'));
	},

	getMarker(idx) {
		data = {};
		dual(Marker.data, "islands", function(a ,b) {
			if (b.idx == idx) {
				data = b;
			}
		});
		return data;
	},

	star (e) {
		e.preventDefault();
		e.stopPropagation();
		var idx = $(this).data('idx');
		var key = stars.indexOf(idx);

		if (~key) {
			stars.splice(key, 1);
		} else {
			stars.push(idx);
		}

		localSave();
		Marker.stars();
	},

	stars () {
		$(".favorite__drop").html('');

		$.each(stars, function(a, b) {
			w = Marker.getMarker(b);

			$(`<div class="drop__list" data-idx='${w.idx}'>
				<span class="list__title">${w.name}</span>
				<i class="list__star far fa-star" data-idx='${w.idx}'></i>
			</div>`).appendTo($(".favorite__drop"));
		});
	}
}

/*
	맵을 관리하는 오브젝트
*/
const Map = {
	zoom : 0,
	img : ["/portfolio_asset/dadohea/imgs/maps/6.4.png", "/portfolio_asset/dadohea/imgs/maps/3.2.png", "/portfolio_asset/dadohea/imgs/maps/1.6.png"],

	init () {
		Map.zoom = ls['zoom'];
		Map.main = new Maper($(".main__map"));
		Map.mini = new Maper($(".main__minimap"));

		Map.mapDraw(() => {
			Map.main.x = ls['x']*1;
			Map.main.y = ls['y']*1;
		});
	},

	mapDraw(cb = () => {}) {
		var image = new Image();

		image.onload = function() {
			Map.mini.image = Map.main.image = {
				source : this,
				w : this.width,
				h : this.height
			}

			cb();

			Map.mini.ctx.globalAlpha = 0.5;
			Map.main.inner();
			Map.main.ctx.clearRect(0,0,99999,99999);
			Map.mini.ctx.clearRect(0,0,99999,99999);
			Map.main.ctx.drawImage(this, -Map.main.x, -Map.main.y, this.width, this.height);
			Map.mini.ctx.drawImage(this, 0, 0, Map.mini.w, Map.mini.h);

			Map.miniMap();
			Marker.refresh();
		}

		image.src = Map.img[Map.zoom];
	},

	zommer (e) {
		ls['zoom'] = Map.zoom;

		let downX = (Map.main.x + e.offsetX) / (Map.main.image.w);
		let downY = (Map.main.y + e.offsetY) / (Map.main.image.h);
		
		Map.mapDraw(() => {
			ls["x"] = Map.main.x = ((Map.main.image.w * downX)) - Map.main.w * (e.offsetX/Map.main.w);
			ls["y"] = Map.main.y = ((Map.main.image.h * downY)) - Map.main.h * (e.offsetY/Map.main.h);
		});
	},

	miniMap() {
		var x = $(Map.mini.c).getStyle("left");
		var y = $(Map.mini.c).getStyle("top");
		var w = (Map.main.w / Map.main.image.w) * Map.mini.w;
		var h = (Map.main.h / Map.main.image.h) * Map.mini.h;

		Map.mini.x = (Map.main.x / Map.main.w) * Map.mini.w * (w / Map.mini.w);
		Map.mini.y = (Map.main.y / Map.main.h) * Map.mini.h * (h / Map.mini.h);

		Map.mini.inner();
		if (Map.mini.x > Map.mini.w - w) {
			Map.mini.x = Map.mini.w - w;
		}
		if (Map.mini.y > Map.mini.h - h) {
			Map.mini.y = Map.mini.h - h;
		}
		if (Map.mini.y < 0) {
			Map.mini.y = 0;
		}
		if (Map.mini.x < 0) {
			Map.mini.x = 0;
		}
		if (h > 150) {
			h = 148;
		}

		var left = x + Map.mini.x;
		var top = y + Map.mini.y;

		Map.mini.navi = {
			width : w,
			height : h,
			left : left,
			top : top,
			border: "2px solid #ff0000"
		}

		$(".redbox").css(Map.mini.navi);

		Map.mini.ctx.globalAlpha = 1;
		Map.mini.ctx.drawImage(Map.mini.c, Map.mini.x, Map.mini.y, w, h, Map.mini.x, Map.mini.y, w, h);
		Map.mini.ctx.drawImage(Map.mini.c, Map.mini.x, Map.mini.y, w, h, Map.mini.x, Map.mini.y, w, h);
		Map.mini.ctx.drawImage(Map.mini.c, Map.mini.x, Map.mini.y, w, h, Map.mini.x, Map.mini.y, w, h);
		Map.mini.ctx.drawImage(Map.mini.c, Map.mini.x, Map.mini.y, w, h, Map.mini.x, Map.mini.y, w, h);
	}
}

/*
	메인 오브젝트
*/
const App = {
	init () {
		Marker.init();
		Map.init();
		App.hook();

		setInterval(function() {
			$(".fa-star").addClass('far').removeClass('fa');

			$.each(stars, function(a, b) {
				$(".fa-star[data-idx='"+b+"']").removeClass('fas').addClass('fa');
			});
		}, 10);
	},

	hook () {
		$(document).on("click", '.ele__title, .favorite__title', function() {
			var a = $(this).next().toggle();

			if ($(this).find(".fa-caret-down").length) {
				$(this).find(".fa-caret-down").removeClass('fa-caret-down').addClass('fa-caret-up');
			} else {
				$(this).find(".fa-caret-up").removeClass('fa-caret-up').addClass('fa-caret-down');
			}
		})
			.on("click", ".drop__list", Marker.animation)
			.on("click", ".marker", Marker.openMarker)
			.on("click", ".fa-star", Marker.star)
			.on("click", ".main__map", function() {
				Marker.open = false;
				$(".main__box").hide();
				$(".marker").removeClass("scale");
			});
	}
}

$.ajaxSetup({
	cache : false
});

$(function() {
	$.when(
		$.ajax({
			url : "/portfolio_asset/dadohea/data/information.json"
		})
	).then(function(a) {
		Marker.data = a.districts;
		App.init();
	});
});