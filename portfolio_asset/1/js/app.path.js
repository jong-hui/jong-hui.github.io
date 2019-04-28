class Path {
	
	// variable setting
	static init () {
		Path.lbl    = ['오동도','여수밤바다','향일암','금오도 비렁길','여수세계박람회장','전남관','해상케이블카','이순신대교','거문도/백도','영취산 진달래']
		Path.normal = [
			[0	,	11	,	37	,	20	,	77	,	54	,	10	,	95	,	27	,	57	],	// 오동도
			[8	,	0	,	27	,	11	,	98	,	10	,	62	,	67	,	43	,	70	],	// 여수밤바다
			[87	,	9	,	0	,	95	,	87	,	78	,	16	,	33	,	35	,	40	],	// 향일암
			[44	,	34	,	78	,	0	,	29	,	19	,	11	,	48	,	74	,	86	],	// 금오도 비렁길
			[64	,	39	,	70	,	36	,	0	,	87	,	98	,	98	,	24	,	89	],	// 여수세계박람회장
			[50	,	86	,	68	,	17	,	12	,	0	,	19	,	61	,	26	,	97	],	// 전남관
			[69	,	87	,	40	,	44	,	24	,	63	,	0	,	57	,	10	,	35	],	// 해상케이블카
			[19	,	2	,	30	,	27	,	23	,	76	,	54	,	0	,	79	,	71	],	// 이순신대교
			[64	,	95	,	12	,	39	,	21	,	99	,	66	,	27	,	0	,	11	],	// 거문도/백도
			[51	,	42	,	3	,	92	,	44	,	98	,	60	,	7	,	7	,	0	], 	// 영취산 진달래
		]
		Path.createTimeTable()
		Path.createPathTemplate()
	}

	// craete template
	static createTimeTable () {
		const label    = Path.lbl
		const arr      = Path.normal
		const styletxt = `
			<style>
				.timeTableView{font-size:11px}
				.timeTableView table{width:100%}
				.timeTableView td,
				.timeTableView th{width:9%;border:1px solid #ddd;}
			</style>
		`
		let   text     = '<table><thead><tr><th>-</th>'
		for (let i = 0; i < 10; i++)
			text += `<th>${label[i]}</th>`
		text += '</tr></thead><tbody>'
		for (let i = 0; i < 10; i++) {
			text += `<tr><th>${label[i]}</th>`
			for (let j = 0; j < 10; j++)
				text += `<td>${arr[i][j]} 분</td>`
			text += '</tr>'
		}
		text += '</tbody></table>'
		Path.timeTable = `<div class="timeTableView">${text}</div>`
		$('head').append(styletxt)
	}

	// createPathTemplate
	static createPathTemplate () {
		Path.template = `
			<div class="path-wrap">
				<div class="line">
					<span class="lbl">최단 경로 :</span>
					<p class="desc">{{path}}</p>
				</div>
				<div class="line">
					<span class="lbl">소요 시간 :</span>
					<p class="desc">{{cost}} 분</p>
				</div>
			</div>
		`
	}

	// root form submit event
	static submit (e) {
		e.preventDefault();
		var arr = $(this).serializeArray();
		var paths = [];
		if (arr.length < 2) {
			alert("경로를 두개이상 선택해주세요.");
			return false;
		}
		$.each(arr, function() {
			paths.push(this.value);
		});

		Path.min = 99999999999;
		Path.root = [];

		for (var i = 0; i < paths.length; i++) {
			Path.short(paths, [paths[i]], 0);
		}

		var str = Path.lbl[Path.root[0]];

		for (var i = 1; i < Path.root.length; i++) {
			str += `<i class='fas fa-long-arrow-alt-right'></i> <span class='cost'>${Path.normal[Path.root[i-1]][Path.root[i]]}분</span> <span class='lbl'>${Path.lbl[Path.root[i]]}</span>`;
		}

		$(".shortest-path").html(Path.template.replace('{{cost}}', Path.min).replace('{{path}}', str));
	}

	// short path find
	static short(ori, p, cost) {
		if (ori.length == p.length) {
			if (Path.min >= cost) {
				Path.min = cost;
				Path.root = p;
				return false;
			}
		}
		if(Path.min < cost) {
			return false;
		}

		for (var i = 0; i < ori.length; i++) {
			if (~p.indexOf(ori[i])) {
				continue;
			}

			// var new_p = p.slice();
			// new_p.push(ori[i]);
			Path.short(ori.filter(x => ori[i] != x), new_p, cost + Path.normal[p[p.length-1]][ori[i]]);
		}
	}

	// static find(level, max, arr, time)
	// {
	// 	if (level == max) {
	// 		return false;
	// 	}

	// 	if (Path.min < time) {

	// 	}

	// 	for (let i = 0; i < arr.length; i++) {
	// 		Path.stack[level+1] = arr[i];
	// 		let nowTime = level < 1 ? 0 : time + Path.stack[level-1][];

	// 		Path.find(level + 1, max, arr.filter((x) => x != i), nowTime);
	// 	}
	// }

	// timetable Layer open 
	static open () {
		Layer.open(Path.timeTable);
	}
}