

class GameBoard {

	constructor (Game) {

		this.Game = Game;
		this.removeTemp = [];

	}

	stageAnimation (stage) {
		return new Promise((resolve, reject) => {
			this.Game.timerInterval.stop();
			this.Game.data = [];

			$("#game-board-items").html('');

			$("#overrap").addClass('animation');

			Promise.all([
				this.reDefineData(),
				this.pangChk(),
				wait(4000)
			]).then((values) => {
				this.stageAnimationEnd();

				this.inLoop().then(() => {
					resolve(1);
				});
			});

		});
	}

	inLoop () {
		this.Game.timerInterval.stop();

		return new Promise((resolve, reject) => {
			Promise.seque([
				this.reDefineData,
				this.viewData,
				this.pangChk
			], this).then(() => {

				if (this.removeTemp.length) {

					Promise.seque([
						this.removeData,
						this.inLoop
					], this).then(() => {
						resolve(1);
					});
				} else {
					resolve(0);

					this.Game.timerInterval.start();
					this.Game.nextStageChk();
				}
			});
		});
	}

	stageAnimationEnd () {
		$("#overrap").removeClass('animation');

	}

	// setData를 reDefineData로 대체 가능
	setData () {

		for (var i = 0; i < 8; i++) {
			this.Game.data[i] = [];
			for (var j = 0; j < 8; j++) {
				this.Game.data[i][j] = new Fruit(i, j);
			}
		}
	}

	reDefineData () {
		return new Promise((resolve, reject) => {
			let reDefineData = [];

			for (var i = 0; i < 8; i++) {
				reDefineData[i] = [];

				for (var j = 0; j < 8; j++) {
					// y 값만 비교하는게 아니라 x값도 비교하도록 수정하기.
					let isData = this.Game.data[i] ? this.Game.data[i].find(x => x.y == j) : undefined;
 
					reDefineData[i][j] = (isData == undefined || isData.remove) ? new Fruit(i, j) : isData;
				}
			}

			this.Game.data = reDefineData;

			setTimeout(() => {
				resolve(this.Game.data);
			}, 100);
		});
	}

	viewData () {
		return new Promise((resolve, reject) => {
			multi(this.Game.data, function(a, b) {
				if (b == undefined) {
					return true;
				}

				b.refreshPos();
			});

			setTimeout(() => { resolve('done') }, 500);
		});
	}

	removeData () {
		let prevScore = this.Game.score;

		return new Promise((resolve, reject) => {
			let isRemove = 0;

			$.each(this.removeTemp, (a, b) => {
				isRemove = 1;

				b.destroy();
			});

			if (isRemove) {
				this.Game.scoreAnimation(prevScore, this.Game.score);
				// dd(this.Game.score, prevScore);
				setTimeout(() => { resolve("end") }, 500);
			} else {
				resolve("asd");
			}
		});
	}

	// 보드가 전부 꽉 차 있을때만 정상작동한다.
	pangChk () {
		return new Promise((resolve, reject) => {
			let baseData = this.Game.data;
			let result = [];

			function findPang (i, val, arr = [], step = 0, arrow = "") {
				arr.push(val);

				let isNext = 0;
				let tester = val.getArround(baseData);

				if (arrow == "") {
					$.each(tester, function(a, b) {
						if (b != undefined && b.fruitId == val.fruitId) {
							findPang(i, b, arr.slice(), step+1, a);
							isNext = 1;
						}
					});
				} else {
					if (tester[arrow] != undefined && tester[arrow].fruitId == val.fruitId) {
						findPang(i, tester[arrow], arr.slice(), step+1, arrow);
						isNext = 1;
					}
				}

				if (!isNext && arr.length >= 3) {
					$.each(arr, function(a, b) {
						if (result.find(x => x.id == b.id)) {
							return true;
						}

						result.push(b);
					});
				}
			}

			multi(baseData, findPang);

			(() => {
				this.removeTemp = result;
				resolve(result);
			})();
		});
	}
}