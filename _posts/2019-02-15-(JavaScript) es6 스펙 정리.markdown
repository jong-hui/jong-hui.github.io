---
layout: post
title: "[Javascript] ES6 문법 (1)"
subtitle: "Javascript ECMAScript6 문법"
categories: tech
tags: javascript ECMAScript ES6
comments: true
---

# ECMAScript

> 이제는 ES6문법은 자바스크립트로 개발하고자 하는 모두가 익히고 있어야 할 필수사항이 되었습니다.

블로그에서 javascript글을 작성하며 ES6 문법을 쓰지 않을 수 없었기 때문에 해당 글을 작성하고자 한다. 다른 블로그에서 배워오라고 할 수도 없기에.  

현재(2019-02-15 기준) ES6문법은 이미 아주 많은 곳에서 사용할 수 있고, 많은 곳에서 사용하고있습니다.  
예를들어 현재 인기가 많은 라이브러리인 [react.js](https://reactjs.org/), [vue.js](https://kr.vuejs.org/v2/guide/index.html) 등등이 모두 es6를 권장, 사용하고있습니다.

***

## 왜 알아야할까

- 좀 더 sweet한 코드.
- 짧은 코드로 더 많은 기능.
- 기존에 쓰던 코드(혹은 라이브러리)를 더 쉽게 대체 가능.
- 기분이 좋다.
- 다들 쓰니까.

`다들 쓰니까` 부분은, 다른 개발자들의 코드를 읽을 수 있게 하기 위해 알아야한다는 뜻이다.  


***

## 어떻게 쓸까

### 변수 선언

`es5`
```javascript
var name = 'jong-hui';
name = 'jong_hui';

console.log(name); // jong_hui
```
기본적으로 쓰이던 변수선언 방식이다. 변수선언에 `var`는 함수 레벨의 스코프를 가진다.  
함수 레벨의 스코프를 가지기때문에 가끔 우리들에게 혼란을 불러오기도 한다.

`es6`
```javascript
const name = 'jong-hui';
name = 'jong_hui'; // TypeError

console.log(name);

or 

let name = 'jong-hui';
name = 'jong_hui';

console.log(name); // jong_hui
```

`var`를 대신할 수 있는 키워드인 `const`와 `let`이 es6에 추가되었다.  
es6이후에는 `var`를 볼일이 없어질 수도 있다.  

`const`는 상수를 선언한다, 상수로 선언한 변수를 바꾼다면 바로 TypeError오류가 나온다.
`let`은 상수가 아닌 변수를 선언한다. `var`와 비슷 하다고도 할 수 있는데, `var`와 달리 `let`은 블럭 레벨의 스코프이다.

> 함수, 블럭레벨의 스코프에 대한 설명은 다음을 참고하길 바란다. -> [추가예정](#)

#### 실사용

es6이후로 `var`는 거의 찾아볼 수가 없고(사용하는 상황이 있긴있다.) 대부분 `const` 혹은 `let`을쓴다.  
대부분의 변수는 `const`로 선언하고, 변경되어야 하는 수면 `let`을쓴다.  
변수를 `let`으로 선언하는 것보다 `const`로 선언하는 편이 코드를 수정, 디버깅할때 더 좋기때문이다.


***

### 화살표 함수

`es5`
```javascript
function add (a, b) {	
	return a + b;
}

console.log(add(1, 2)) // 3
```
평소 쓰던 함수 표현식입니다. 별 다를것이 없습니다. 그저 add 함수를 생성하고 로그를 찍어줫습니다.

`es6`
```javascript
const add = (a, b) => {
	return a + b;
}

console.log(add(1, 2)) // 3

or

const add = (a, b) => a + b;

console.log(add(1, 2)) // 3
```
함수 표현을 `function() {}`을 `() => {}`이런식으로 대체했습니다. 놀랍지 않나요?
위의 예제를 보면 중괄호를 쓰지 않았을 시에는 `return`도 생략이 가능합니다. 좀 더 예를 들어보죠.

`es6`
```javascript
const reduceNumber = (number, current) => number + current;

const array = [3, 5, 6, 2];
const total = array.reduce(reduceNumber);

console.log(total); // 16
```
화살표 함수를 사용하면 이렇게 기존의 함수표현식보다 더 sweet한 코드 작성을 할 수 있습니다.  

사실 화살표 함수는 기존의 표현식을 완전히 대체하는 것은 아닙니다. 몇가지 특징들이 있죠.

화살표 함수는 모두 
1. `this`를 바인딩 하지않습니다.
2. 항상 익명함수 입니다.
3. `new` 키워드로 생성할 수 없습니다.

1번의 의미는 화살표 함수내에서 화살표 함수 자신을 가르키지 못한다는 말입니다.  
3번은 `this`를 바인딩 하지 않기때문에 `new` 키워드로 사용 못하겠죠?

1번에 대한 예를 들어보죠.

`es5`
```javascript
var obj = {};
obj.getAlert = function() {
	return this.alert;
}

console.log(obj.getAlert()) // undefined
```
위 코드를 실행하면 `undefined`가 뜹니다. `getAlert`에서의 `this`는 자기자신인 `obj`객체를 가르키기 때문이죠.  
`obj`객체에 `alert`가 없기때문에 `undefined`, 찾지 못하였다고 하는 것입니다.

`es6`
```javascript
var obj = {};
obj.getAlert = () => {
	return this.alert;
}

console.log(obj.getAlert()) // ƒ alert() { [native code] } (window.alert 입니다)
```
이 코드에서는 다릅니다. getAlert에서의 this는 자기자신(`obj`)를 가르키지않고 보다 상위의 `this`를 가져옵니다.  
그렇기때문에 보다 상위, 그러니까 전역객체(브라우저에서는 `window`입니다)의 `alert`를 리턴하게 되는 것입니다.

`es6`
```javascript
var obj = {};
obj.getAlert = function() {
	// 여기서의 this는 obj
	return (() => {
		// 이 함수보다 상위의 this를 가져옴. 여기서는 obj
		return this.alert;
	})();
}

console.log(obj.getAlert()) // undefined
```
위 예제에서는 `undefined`가 나옵니다.



#### 실사용

정말 많이쓰는 es6문법 같습니다. 거의 모든 곳에서 사용합니다.  
sweet한 코드를 작성할 수 있고, 알아보기 쉽기 때문이죠.

`es6`
```javascript
const add = (base) => (num) => base + num;

const add3 = add(3);

cosole.log(add3(6)) // 9
```
이런 식의 sweet한 코드를 작성 할 수 있습니다.

***

너무 길어져서 다음 포스팅에서 이어 나가도록 하겠습니다.

## 외부링크

<http://es6-features.org>