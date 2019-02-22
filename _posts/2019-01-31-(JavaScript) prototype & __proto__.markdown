---
layout: post
title: "[Javascript] Prototype과 __proto__의 이해"
subtitle: "오브젝트의 prototype 이해"
categories: devlog
tags: javascript prototype __proto__
comments: true
---

자바스크립트 프로토타입에 대하여
----------

> 프로토타입을 이해한 순간 자바스크립트가 재미있어지고, 자바스크립트를 마음대로 다룰 수 있다고 생각합니다.


### 문제개요

어느날 이런 코드를 보았습니다.

```javascript
function Test () { }

Test.sum = function() {
	return 1 + 1;
}

Test.prototype.sum = function () {
	return 2 + 1;
}
```

평소 자바스크립트의 프로토타입을 이해하고 있었다고 생각했지만, 이 코드를 보며 생각하지 않을 수가 없었습니다.  
분명 sum 함수는 차이가 있는걸 알고 있지만 왜 차이가있는지, 왜 그렇게 쓰는지 알 수 없었습니다.

참고로 위 코드는 아래의 코드와 같습니다.

```javascript
class Test {
	static sum () {
		return 1 + 1;
	}

	sum () {
		return 2 + 1;
	}
}
```
클래스에 대한 이야기는 다음에 다루도록 하겠습니다.


***

### 어떻게 다를까?

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console1.png)

Test 객체를 new 키워드로 생성하니 2 + 1을 해주는 함수(이하 B함수)는 `__proto__` 안에 들어갔고, 1 + 1을 해주는 함수(이하 A함수)는 사라졌습니다.

그럼 이번엔 조금 다른 코드를 실행해보겠습니다.

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console2.png)

A함수가 `__proto__`와 같은 위치에 들어갔고, B함수는 proto 안에 있습니다.  
이 상태에서 `t.sum()` 을 실행시키면 A함수가 실행됩니다.

그렇다면 이번엔 A함수를 정의하지 않고 `t.sum()` 을 실행시키겠습니다.

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console3.png)

B함수가 실행이되어 3이 리턴됩니다. B함수는 `__proto__`안에 있는데 어떻게 실행이되고 3이 리턴이된걸까요?

이번엔 좀 다른 예제를 들어보겠습니다.

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console4.png)

이번에도 역시 toString이란 함수는 없지만 정상적으로 실행이 되었습니다.

toString은 Object의 prototype중 하나입니다 [Object.prototype.toString](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

***

### \_\_proto\_\_가 주범

객체의 prototype은 객체를 생성했을때 `__proto__` 안에 들어가게됩니다. 그래서 B함수가 `__proto__` 안에 존재하는것이죠.

자바스크립트 객체는 만약 찾는 곳(이 포스팅 에서는 `t.sum()`)이 없다면 `__proto__` 에 있는지 확인하고 있다면 찾아주는 것입니다.  
만약 `__proto__`에도 없다면 `__proto__`의 `__proto__`까지 찾게됩니다.

다시 말 하자면 t.sum이 없다면 `t.__proto__.sum` 을 찾고 또 없다면 `t.__proto__.__proto__.sum` 까지 찾는것이죠. 이게 반복되어 결국 최상위까지 가게되고, 끝까지 없다면 undefined를 리턴해줍니다.

그렇다면 `t.__proto__`는 우리가 Test 생성자에 prototype으로 선언한것들이 들어갔습니다. 그래서 B함수(`t.__proto__.sum`)가 실행된거죠.  
하지만 `t.__proto__.__proto__`에는 어느 객체의 prototype이 들어갔던걸까요? 방금전 봤던 콘솔을 다시 보겠습니다.

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console4.png)

toString은 Object의 프로토타입입니다. 즉 t의 prototype link(= \_\_proto\_\_)중 Object가 있는것이죠.

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console5.png)

그래서 `t.__proto__.__proto__` 와 `Object.prototype을` 비교하면 true가 나옵니다. Number의 prototype과 비교하면 false가 나오겠습니다.

***

### 상속을 받은것인가?

그렇다면 Test로 생성된 t는 Object의 프로토타입을 사용할 수 있으니 상속을 받은것일까요?

정답은 그렇습니다. (저는 상속보다는 확장[extend]이 더 올바른 표현이라고 생각합니다)

저는 이런생각을 했습니다.
> Object 객체가 아닌, 다른 객체(내가 만든 객체)를 상속해 줄 수는 없을까?

```javascript
function Animal () {

}

Animal.prototype.bark = function () {
	console.log(this.barkSound);
}
Animal.prototype.getName = function () {
	console.log(this.animalName);
}

function dog () {
	this.barkSound = "bowwow";
	this.animalName = "dog";
}

var volt = new dog();

volt.bark(); // Uncaught TypeError
```

결국 오류가 났습니다. 저는 볼트가 짖는소리를 듣고싶은데 말이죠.

```javascript
function Animal () {

}

Animal.prototype.bark = function () {
	console.log(this.barkSound);
}
Animal.prototype.getName = function () {
	console.log(this.animalName);
}

function Dog () {
	// 추가한 코드, Animal의 prototype을 원래 Object의 prototype 있던 자리에 넣습니다
	this.__proto__.__proto__ = Animal.prototype;

	this.barkSound = "bowwow";
	this.animalName = "dog";
}

var volt = new Dog();

volt.bark(); // bowwow
console.log(volt.toString) // [object Object]
```

Animal의 prototype을 강제로 넣어줌으로써 볼트의 울음소리를 들을 수 있게됐군요!

하지만 이렇게 하면 Object의 prototype을 쓸 수 있을까요?

네! 쓸 수 있습니다 `Animal.prototype.__proto__`가 `Object.prototype`이기 때문이죠

![javascript_console](https://jong-hui.github.io\assets\img\posts\prototype&__proto__\console6.png)

정리하자면 이렇게 되었습니다.

* `volt` = 생성된 Dog객체.
* `volt.__proto__` = Dog객체의 prototype.
* `volt.__proto__.__proto__` = Animal객체의 prototype.
* `volt.__proto__.__proto__.__proto__` = Object객체의 prototype.

이렇게 되어서 volt는 Dog, Animal, Object 들의 prototype을 모두 쓸 수 있는것이죠!

***

### 문제해결

아직도 자바스크립트 이해가 잘 안된다. 더욱 더 공부를많이해야겠다.


### 참고한 사이트

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/class>