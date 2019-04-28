

const Config = {
	totalStage : 3, // 1단계, 2단계, 3단계 총 3번
	stageTimer : [50, 40, 30], // 스테이지 별 제한시간 50초, 40초, 30초
	stageScore : [40000, 50000, 60000], // 스테이지 별 얻어야 하는 스코어
	fruits : ["apple", "banana", "grape", "peach", "watermelon"],
	fruitsSrc : ["fruit-apple.png", "fruit-banana.png", "fruit-grape.png", "fruit-peach.png", "fruit-watermelon.png"],
	fruitsLeft : [10, 100, 190, 280, 370, 460, 545, 635],
	fruitsTop : [10, 100, 190, 280, 370, 460, 545, 635],

	keyMap : {
		37 : "left",
		38 : "top",
		39 : "right",
		40 : "bottom",
	}
}