---
layout: post
title: "[Javascript] Reactive in JS"
subtitle: "반응형 프로그래밍에 대한 이해"
categories: devlog
tags: js javascript 반응형 반응형프로그래밍 프로그래밍 reactive_programming
comments: true
header-img: "/img/header_imgs/ReactiveInJS.png"
---

# Reactive Programming

Reactive(반응적인) Programming(프로그래밍)

> Reactive Programming | 데이터 스트림 및 변경 전파와 관련된 선언적 프로그래밍 패러다임

Reactive Programming(: 이하 RP)의 사전 정의는 위와 같습니다.  
이 게시물에서는 `자바스크립트로 어떻게 PR을 구현하나`에 대하여 간략히 다뤄, RP 개념의 이해를 돕습니다. RP의 개념에 대해서는 해당 게시물에서 크게 다루지 않을 것이니, 익숙하지 않다면 다른 블로그의 [글](https://dev-daddy.tistory.com/25)을 참고해주세요.

## Reactive Programming이란? 

간략히 설명하자면, 어떤 데이터가 변함에 따라 다른 데이터의 상태가 변함을 뜻합니다. 상상해봅시다, 당신은 타이머를 만드려고 합니다. [명령형 프로그래밍](https://ko.wikipedia.org/wiki/%EB%AA%85%EB%A0%B9%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D) 패러다임으로 이 타이머를 만드려고 하면, 시작된 시간으로부터, 현재까지 흐른 총 시간을 계산하고, 또 흐른 분을 계산하고, 또 1시간 이상이 지났다면, 나누고 나머지를 가져오고 등등의 과정을 거쳐야 합니다.  
하지만, `반응형 프로그래밍` 패러다임을 사용한다면, 당신은 1초마다 값에 1을 더해주기만 하면 Observer(관찰자)가 이 변경을 잡아내고, 변경된 값을 이용해 시간, 그리고 분을 계산해 줄 것입니다.  
이제 이런 가정들을 직접 코드로 구현해보며 비교해보려고 합니다.

----------------

## 들어가기 앞서

들어가기 전에 현재 자바스크립트 생태계에서는, 함수형 프로그래밍과 함께, 반응형 프로그래밍도 많이 쓰이고 있습니다. Vue에서는 자체적으로 [반응형 시스템](https://kr.vuejs.org/v2/guide/reactivity.html)을 사용합니다. 또한, [ReativeX](http://reactivex.io/)의 RxJS 라이브러리도 React와 함께 많이 사용하고 있습니다. [Mobx](https://mobx.js.org/README.html)는 Introduction에 `functional reactive programming`을 적용 했다고 적혀있습니다.   
그만큼 현재 자바스크립트 생태계에서는, 함수형 프로그래밍과 함께 정말 중요한 개념이라고 생각합니다. 그렇기에, 배울 가치가 있다고 개인적으로 생각합니다.

-----------------

## 명령형 프로그래밍으로 타이머 구현하기

```javascript
const timerDiv = document.createElement("div")
const hourDiv = document.createElement("span")
const minDiv = document.createElement("span")
const secDiv = document.createElement("span")
const body = document.querySelector("body")
const nowTime = +new Date()

timerDiv.append(hourDiv)
timerDiv.append(minDiv)
timerDiv.append(secDiv)
body.append(timerDiv)

setInterval(() => {
	const diffSeconds = Math.floor((+new Date() - nowTime) / 1000)

	secDiv.innerHTML = `:${diffSeconds % 60}`
	minDiv.innerHTML = `:${Math.floor(diffSeconds / 60) % 60}`
	hourDiv.innerHTML = `${Math.floor(diffSeconds / (60 * 60)) % 24}`
}, 1000)
```
`빈 페이지를 열고, 콘솔에 해당 코드를 입력하면 타이머를 확인할 수 있습니다.`


## 반응형 프로그래밍으로 타이머 구현하기

```javascript
class PublicSubject {
	constructor(value) {
		this.subscribeCallbacks = []
		this.currentValue = this.subjectValue = this.baseValue = value
	}

	onNext(value) {
		this.currentValue = this.subjectValue = value

		this.subscribeCallbacks.forEach(callback => {
			callback(value)
		});
	}

	subscribe(callback) {
		this.subscribeCallbacks.push(callback)
	}

	get value() {
		return this.currentValue
	}
}
	
const timerDiv = document.createElement("div")
// 중략
body.append(timerDiv)

diffTime.subscribe((diffSeconds) => {
	secDiv.innerHTML = `:${diffSeconds % 60}`
	minDiv.innerHTML = `:${Math.floor(diffSeconds / 60) % 60}`
	hourDiv.innerHTML = `${Math.floor(diffSeconds / (60 * 60)) % 24}`
})

setInterval(() => {
	diffTime.onNext(diffTime.currentValue + 1)
}, 1000)
```

명령형으로 구현한 코드보다 코드 수는 더 길지만, 확실히 장점이 많은 코드입니다.  
다음과 같은 상황에서 장점을 발휘할 수 있습니다.

- 다른 곳(예를 들어 10분이 지났을 때 알림이 울리는 기능)에서 diffTime의 반응을 구독(subscribe)할 때 **확장성**이 좋다.
- **변화에 유연**하다. 1분 타임머신 버튼을 기능을 만들고 싶을 때는 그저 `diffTime.onNext(diffTime.currentValue + 60)`만 해주면 된다.
- 분리가 쉽다. 만약 hourDiv, minDiv, secDiv가 각각 다른 파일에 있더라도, 각각의 파일에서 구독을 해줘 로직을 분리할 수 있다.
- 선언형 프로그래밍 패러다임과 함께, 함수형 프로그래밍을 채용할 수도 있다.


## 끝으로

이미 자신도 모르게 해당 개념을 라이브러리나 혹은 프레임워크를 통해 사용했을 수도 있다. 본인이 사용하는 게 어떤 건지 확실히 알고, 또한 왜 이렇게 됐는지, 뭐가 필요해서 이런 개념을 채택했는지 속사정을 알면, 좀 더 깔끔하고 최적화된 코드를 작성할 수 있을 거라고 생각한다.  
뭔가 글도 갑자기 끝난 것 같아 아쉽고, 더 자세하게 설명하고 싶은 욕심이 있어서 함수형, 선언형, 반응형에 대한 글을 한번 더 올리고 싶다. 많이 부족한 내용인 것 같다.