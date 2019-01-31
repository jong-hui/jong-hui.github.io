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


### 참고한 사이트

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super>
<https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/class>