---
layout: post
title: "[Javascript] Prototype과 __proto__의 이해"
subtitle: "오브젝트의 prototype 이해"
categories: tech
tags: javascript prototype __proto__
comments: true
---

자바스크립트 프로토타입에 대하여
----------

> 프로토타입을 이해한 순간 자바스크립트가 재미있어지고, 마음대로 다룰 수 있다고 생각합니다.


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

평소 자바스크립트의 프로토타입을 이해하고 있었다고 생각했지만, 이 코드를 보며 생각하지 않을 수 없었습니다.
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


### 어떻게 다를까?

![javascript_console](\assets\img\posts\prototype&__proto__\console1.png)

Test 객체를 new 키워드로 생성하니 2 + 1을 해주는 함수(이하 B함수)는 \_\_proto\_\_ 안에 들어갔고, 1 + 1을 해주는 함수(이하 A함수)는 사라졌습니다.

그럼 이번엔 조금 다른 코드를 실행해보겠습니다.

![javascript_console](\assets\img\posts\prototype&__proto__\console2.png)

A함수가 \_\_proto\_\_와 같은 위치에 들어갔고, B함수는 proto 안에 있습니다.
이 상태에서 t.sum() 을 실행시키면 A함수가 실행됩니다.

그렇다면 이번엔 A함수를 정의하지 않고 t.sum() 을 실행시키겠습니다.

![javascript_console](\assets\img\posts\prototype&__proto__\console3.png)

B함수가 실행이되어 3이 리턴됩니다. B함수는 \_\_proto\_\_안에 있는데 어떻게 실행이되고 3이 리턴이된걸까요?

이번엔 좀 다른 예제를 들어보겠습니다.

![javascript_console](\assets\img\posts\prototype&__proto__\console4.png)

이번에도 역시 toString이란 함수는 없지만 정상적으로 실행이 되었습니다.

toString은 Object의 prototype중 하나입니다 [Object.prototype.toString](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)


### \_\_proto\_\_가 주범.


### 참고한 사이트

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/class>