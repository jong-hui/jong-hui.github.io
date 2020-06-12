---
layout: post
title: "[Javascript] 더 이상은 'this'에게 뒤통수를 내주지 말자"
subtitle: "this 키워드에 대해 알아봅시다"
categories: devlog
tags: js javascript this keyword 
comments: true
header-img: "/img/header_imgs/thissss.png"
---

# this

자바스크립트를 작성하다보면, 많은 상황에서 `this`를 만날 수 있습니다. 헌데 이 `this`는 상황에 따라 값이 변하니, 잘 알고 쓰지 않으면 `this`에게 뒤통수를 맞을 수 있습니다.  
이 게시글에서는 어떤 상황(_문맥_)에 존재하는 `this`의 값이 어떻게 변하는지 설명합니다. `this`를 파악하면, 더 좋은 품질의 자바스크립트 웹/앱을 작성하실 수 있을 겁니다.  
이제 `this`를 알아봅시다! 지금 바로 (크롬 브라우저에서) `F12`를 누르고 스크롤을 내리시며 저만 따라오세요.

------------

## this란

객체는 자바스크립트에서 중요한 개념중 하나입니다. 거의 모든 값들은 객체로 이루어져있습니다. `this`또한 객체인데요, 자바스크립트 코드를 쓰시다면 어느 곳에서든 `this`를 호출하실 수 있을 겁니다. 아 참, 알아두셔야 할 게 하나 더 있습니다! `this`는 **실행 방식**에 따라 값이 변합니다!

## 인터프린터와 실행컨텍스트

자바스크립트는 스크립트 언어입니다. 즉, 컴파일 과정이 없다는 걸 의미합니다. 컴파일러가 없는 대신, 인터프린터가 있습니다. 이 인터프린터는 코드를 읽고 한줄 씩 실행합니다. 코드가 실행되는 환경을 [실행 컨텍스트](https://jong-hui.github.io/devlog/2019/11/13/execution-context/)라고 합니다. 그리고 `this`는 이 실행 컨텍스트가 변경될 때마다 변경됩니다.

> [문법의 문맥, 실행 컨텍스트](https://jong-hui.github.io/devlog/2019/11/13/execution-context/)

--------- 

## this는 전역 객체

기본적으로, 실행 컨텍스트는 전역입니다. 즉, 간단한 함수 표현식이 실행될 때는 `this`는 전역 객체를 가르킵니다.  
브라우저에서의 전역 객체는 `window`이며, NodeJS에서는 `global`이 전역 객체입니다.


```javascript
function foo () {
	console.log("간단한 함수 표현식 실행!");
	console.log(this === window); 
}

foo();	// true
console.log(this === window) // true
```
`해당 코드를 개발자도구 콘솔창에 입력해보세요!`

### IIFE

IIFE는 즉시 실행 함수 표현식의 줄임말로써, 주로 클로저의 오작동을 해결하거나, `global scope`를 오염시키지 않기 위해서 사용합니다.

```javascript
(function(){
	console.log("익명 함수 호출!");
	console.log(this === window);
})();
// true
```
`해당 코드를 개발자도구 콘솔창에 입력해보세요!`

### strict 모드

어떤 환경에서 strict모드가 활성화되어 있다면, 전역 객체는 존재하지 않습니다. 즉, strict모드에서 `this`로 전역 객체를 참조하려고 한다면 `undefined`를 불러올 것입니다.

```javascript
function foo () {
	'use strict';
	console.log("간단한 함수 표현식 실행!")
	console.log(this === window); 
}

foo(); // false
```
`해당 코드를 개발자도구 콘솔창에 입력해보세요!`

------------

## this는 새로운 인스턴스

`new`키워드로 함수가 호출될 때, 이 함수를 생성자 함수라고 하며 새로운 인스턴스를 반환합니다. 이 때의 `this`는 새롭게 생성된 인스턴스를 참조합니다!

```javascript
function Person(fn, ln) {
	this.first_name = fn;
	this.last_name = ln;

	this.displayName = function() {
		console.log(`Name: ${this.first_name} ${this.last_name}`);
	}
}

let john = new Person("John", "Reed");
john.displayName();  // Name: John Reed
let paul = new Person("Paul", "Adams")
paul.displayName();  // Name: Paul Adams
```
`해코개콘입!`

`john.displayName`에서는 해당 인스턴스인 `john`을 나타내고, `paul.displayName`에서는 해당 인스턴스인 `paul`을 나타냅니다.

------- 

## this는 부모 객체

자바스크립트 객체의 속성에는 메소드가 포함될 수 있습니다. 이 메소드가 호출될 때, 이 때의 `this`는 호출된 메소드를 포함하고 있는 객체를 참조합니다. 즉, `this`는 해당 메소드를 가지고 있는 부모 객체입니다.

```javascript
function foo () {
	'use strict';
	console.log("간단한 함수 표현식 실행!")
	console.log(this === window); 
}

let user = {
	count: 10,
	foo: foo,
	foo1: function() {
		console.log(this === window);
	}
}

user.foo()  // false (이제는 "this"가 전역 객체가 아닌, user객체를 나타내기 때문)
let fun1 = user.foo1;
fun1() // true (함수 선언식으로 호출되기 때문)
user.foo1()  // false (오브젝트의 메소드로 호출되기 때문)
```

---------

## apply와 call을 사용한다면?

모든 함수는 `call`, `bind`, 그리고 `apply`라는 메소드를 포함하고 있습니다. 이 메소드들은 사용자가 원하는 값으로 `this`를 직접 지정할 수 있게 해줍니다.

```javascript
function Person(fn, ln) {
	this.first_name = fn;
	this.last_name = ln;

	this.displayName = function() {
		console.log(`Name: ${this.first_name} ${this.last_name}`);
	}
}

let john = new Person("John", "Reed");
john.displayName();  // Name: John Reed
let paul = new Person("Paul", "Adams")
paul.displayName();  // Name: Paul Adams

john.displayName.call(paul); // Name: Paul Adams
```

해당 메소드들의 자세한 스펙은 다음의 링크들을 통해 알아보세요.
- [apply](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [bind](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [call](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call)


--------

## 화살표 함수를 사용한다면?

화살표 함수란 `ES6`스펙에서 새로 정의된 함수 표현식입니다! 아주 유용한 문법이니 만큼, 배워보시는 걸 추천드립니다.  
이 화살표 함수에는 몇가지 특성이 있습니다. 그 중 한가지는 자신의 `this`를 가지지 않다는 점입니다. 그래서 생성자로 사용할 수 없고, 함수의 외부에서 사용하는 `this`를 그대로 가져다 사용합니다.


```javascript
this.a = 5;
this.b = 2;

let obj = {
	a:2,
	b:3,
  sum: () => {
    console.log(this.a * this.b);
  }
}

obj.sum(); // 10 
```

화살표 함수를 사용하지 않았다면, `6`이 출력되었을 겁니다.

> [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)

--------

## 정리

자바스크립트에서 `this`는 다음과 같은 규칙들로 유추해낼 수 있습니다!

- 기본적으로 `this`는 전역 객체를 참조한다. (window 혹은 global)
- `new`키워드로 생성된 인스턴스에서는 `this`가 해당 인스턴스를 참조한다.
- 메소드로 함수가 호출된다면 `this`는 부모 객체를 참조한다.
- `call`, `apply`메소드를 사용하면 `this`를 마음대로 정의할 수 있다.

이 규칙들을 유념하며 코드를 작성한다면, 더이상 `this`에게 뒤통수를 맞지 않을 겁니다!