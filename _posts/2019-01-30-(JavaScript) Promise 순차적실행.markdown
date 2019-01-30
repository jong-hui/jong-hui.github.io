---
layout: post
title: "[Javascript] Promise 순차적 실행"
subtitle: "Javascript Promise 순차적 싱행"
categories: tech
tags: javascript promise
comments: true
---

순차적으로 실행되는 promise
===============

웹게임을 제작할때 비동기를 사용할 일이 생겼다.
Promise를 이용하여 제작하던 중 순차적으로 실행시켜야 하는 일이 생겨 해결하던 중
나중에도 이런일이 생기면 현재 블로깅하고 있는 글을 참고하면 좋을 것 같아 글을 써본다.

> [프로미스의 이해를 도와주는 글](https://programmingsummaries.tistory.com/325)


***

### 사건개요

![pang-1](/assets/img/posts/promise-pang/1.PNG)

8x8 의 배열로 이루어진 이 게임은 애니팡과 유사한 게임이다.
게임을 시작하면 과일들이 아래로 내려오고, 내려온 과일 중 3개 이상 연속되는 과일이 있는경우
그 과일들을 모두 없애 점수를 얻는 게임이다.

나는 과일들이 내려오는 함수를 제작하였고, 그리고 연속되는 과일들을 없애주는 함수를 총 두개의 함수를 제작하였다.

~~~javascript
Promise.all([
	this.viewFruit(), // 과일들이 내려오는 함수
	this.removeFruit() // 과일들이 없어지는 함수
]).then(() => {
	resolve(1);
});
~~~

코드를 작성하여 테스트를 해보니 과일들이 내려오는 도중 없어진다.
두 함수가 동시에 실행되서 그런결과가 나온 것이다.

Promise.all이란, 모든 Promise들이 **동시에 실행되고** 완료가 되면 작업을 진행해주는 API이다.
하지만 나는 순차적으로 Promise들을 진행하고싶다. viewFruit가 끝난 뒤 removeFruit가 실행되는...

~~~javascript
this.viewFruit().then(() => {
	this.removeFruit().then(() => {
		resolve(1);
	});
});
~~~

이런식으로 코드를 짜자니 너무 무섭다.
순차적으로 실행되어야 하는 Promise의 갯수가 많아지면 어떻게 감당할것인가.


*** 

### 사건해결

난 [Array.prototype.reduce](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)를 사용하여 이 문제를 해결했다.

~~~javascript
Promise.seque = function(arr) {
	return arr.reduce((prevPro, curPro) => {
		return prevPro.then(curPro);
	}, Promise.resolve());
}

// 디버깅을 위한 함수
function wait (sec) {
	return function() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log(sec);
				resolve(sec);
			}, sec);
		});
	}
}
~~~

![console](/assets/img/posts/promise-pang/seque.PNG)

위와 같이 wait함수들이 차례대로, 그 전 Promise가 끝나면 실행되는 결과를 볼 수 있다.


~~~javascript
Promise.seque([
	this.viewData,
	this.removeData
]).then(() => {
	resolve(1);
});
~~~