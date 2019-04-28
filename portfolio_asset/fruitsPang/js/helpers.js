

window.dd = console.log;


window.rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
window.on = (event, el, cb) => $(document).on(event, el, cb);

Array.prototype.one = function() {
	return this[rand(0, this.length)];
}

$.prototype.combine = function (method, array) {
	if (method == "find") return $(this.map((i, v) => $(v).find(array[i])));
	return this.each(function (i) { $(this)[method](array[i]); });
};
$.prototype.outAnimate = function (cl) {
	setTimeout(() => {
		this.removeClass(cl);
	}, (this.css('animation-duration').replace('s','')*1)*1000);

	return this;
}

Promise.seque = function(arr, bind) {
	return arr.reduce((prevPro, curPro) => {
		return prevPro.then(curPro.bind(bind));
	}, Promise.resolve());
}


function intervalMicro(cb, timeout, ...args) {
	this.timeout = timeout;
	this.cb = cb;
	this.args = args;
	this.step = timeout < 10 ? timeout : 10;
	this.i = 0;
	this.interval = 0;
	this.status = 0;

	this.start = () => {
		this.stop();
		this.status = 1;

		this.interval = setInterval(() => {

			if (this.status) {
				this.i += this.step;

			}

			if (this.i >= this.timeout) {
				this.i = 0;
				this.cb(...args);
			}

		}, this.step);

		return this;
	}

	this.stop = () => {

		this.status = 0;
		clearTimeout(this.interval);

		return this;
	}

	this.clear = () => {
		this.i = 0;
	}


	return this.start();
}

function multi (multiArr, cb, cb2 = function() {}) {
	$.each(multiArr, function(a, b) {
		cb2(a, b);

		$.each(b, function(q, w) {
			cb(q,w);
		});
	});
}

function wait (sec) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(sec);
			resolve(sec);
		}, sec);
	});
}

function getArrowFromKeyCode (keyCode) {
	// if (Config.keyMap[keyCode] == undefined) return ;
	return Config.keyMap[keyCode];
}

function flipArrow (arrow) {
	return ({
		left : "right",
		right : "left",
		top : "bottom",
		bottom : "top"
	})[arrow];
}


// $.prototype.
