// animation set
class Animation {

	// aniamtion option create & play
	constructor (option) {
		this.obj = option.obj;
		this.cb=  option.cb || function() {};
		this.reverse = option.reverse || false;
		this.none = option.none || false;

		if (!this.none) {
			this.clear();
		}
		this.play();
	}

	// animation play
	play () {
		var self = this;
		var seq = this.reverse ? this.obj.find(".reverse") : this.obj.find('.ani');
		var timer = 0;
		if (!this.none) {
			Animation.tok(this.obj, this.reverse);
		}

		$.each(seq, function(a, b) {
			if (self.reverse) {
				var obj = seq.eq(seq.length - a - 1);
			} else {
				var obj = $(b);
			}

			var timeout = setTimeout(function() {
				if (self.reverse) {
					obj.addClass('be').removeClass('reverse none');
				} else {
					obj.addClass('reverse type').removeClass("be none");
				}
			}, timer += obj.data('delay') ? obj.data('delay')*1 : 30);

			if (!self.none) {
				Animation.stack.push(timeout);
			}
		});

		setTimeout(function() {
			self.cb();
		}, timer);

	}

	// animation obj init
	static tok (obj, type) {
		var seq = type ? obj.find('.reverse') : obj.find('.ani');

		if (type) {
			seq.removeClass('none be');
		} else {
			seq.addClass('none be')
		}
	}

	// aniamtion clear
	clear () {
		$.each(Animation.stack, function(a, b) {
			clearTimeout(b);
		});
		Animation.stack = [];
	}

	// aniamtion init
	static init () {
		Animation.stack = [];
		$.each($(".child"), function() {
			var type = $(this).data('type') || "";
			$(this).children().addClass('ani '+type);
		});


		this.styleSet();
	}

	// animation style
	static styleSet () {
		$(`<style>
			.ani { opacity: 1; transition : 1s !important; transform : inherit; }
			.ani.be { opacity: 0; transition : 0s; transform : scale(0); }
			.ani.be.l2r { transform : translateX(-100px); }
			.ani.be.r2l { transform : translateX(100px); }
			.ani.be.t2b { transform : translateY(-100px); }
			.ani.be.b2t { transform : translateY(100px); }
			.ani.be.type { transition : 1s !important }
			.ani.be.none { transition : 0s !important }
		</style>`).appendTo('head');
	}
}