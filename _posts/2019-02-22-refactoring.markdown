---
layout: post
title: "클린코드 리팩토링 정리"
subtitle: "클린코드와 리팩토링에 대하여"
categories: develog
tags: clean-code refactoring javascript
comments: true
---

# 리팩토링 (refactoring)

> 리팩토링 | '결과의 변경 없이 코드의 구조를 재조정함'

코드를 깔끔하고 예쁘게(sweet)하게 만들기 위해서는 리팩터링 작업이 필수적입니다.  
한 번에 만든건 완벽할 수 없기 때문이죠.  
여러번의 리팩토링 과정을 거쳐야 좋은 코드가 나온다고 생각합니다.

## 리팩토링이란

```javascript
if (e.deltaY < 0 && window.scrollY == 0 && isHook) {
	headerClosebyStat(0);
	return false;
}

if (e.deltaY > 0 && window.scrollY == 0 && isHook) {
	headerClosebyStat(1);
	return false;
}
```

자, 다음과 같은 코드가 있습니다.  

어떤 이가 보기에는 전혀 문제없어 보이는 코드입니다.  
네 맞습니다, 작동에는 전혀 문제가 없습니다.  

하지만 보기에는 문제가 있을지도 모르죠, 보기에 불편하고 중복되는 코드들이 있어 `코드의 구조를 재조정`, 즉 `리팩토링` 과정이 필요할 것 같습니다.

리팩토링 한 뒤의 코드는 이렇습니다.
```javascript
if (window.scrollY == 0 && isHook) {
	headerClosebyStat(e.deltaY > 0);
	return false;
}
```
놀랍게도 두 코드는 모두 같은 작동을 합니다.  
하지만 구조를 바꿔줌으로써 소스는 `더 짧고, 알아보기 쉽게` 바뀌었죠.

## 리팩터링의 필요성

리팩토링은 `클린코드`로 가기위해 필수적으로 해야하는 것입니다.  
그럼, 클린코드는 뭐고 클린코드에 왜 가야할까요?  

### 클린코드
클린코드는 좋은코드입니다. 추상적이지만 정말 그렇습니다.  
저는 코드를 보고는 좋은코드라고 느낄때가 종종 있습니다.  

위의 예제와같이 리팩토링을 통하여 코드를 단축시켜 가독성을 높인다거나 하는 작업을 통하였을때 말이죠  
그런 작업을 하면 제 `코드에 애정이갑니다.`  

코드에 애정이 간다는 것은 좋은 일입니다.  

결국 저는 애정이 가는, 자랑하고픈 코드를 좋은코드(클린코드)라고 말 하고 싶습니다.

## 맺는말

클린코드에 대한 참고자료를 찾아서 링크를 달고싶은데 마땅히 달만한 자료가 없다.  
책이 가장 좋은 것 같다.  

클린코드 어렵다.  

요즈음 블로그든 뭐든 남는시간에는 전부 글을 쓰다보니 글을 쓰는 속도가 늘었다.  
하지만 글을 쓰는 솜씨가 늘은지는 잘 모르겠다. 

이 글을 쓸때 리팩토링 혹은 리팩터링으로 쓸까 고민을 했는데, 위키백과가 리팩터링이라고 쓴다. 하지만 리팩토링으로 써야겠다.

맺는말이 너무 기넹.

## 외부링크

<http://www.kosta.or.kr/mail/2015/download/CleanCode_Part1.pdf>
<http://www.yes24.co.kr/Product/goods/11681152>
<https://medium.com/@joongwon/%ED%81%B4%EB%A6%B0-%EC%BD%94%EB%93%9C%EC%99%80-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EC%9E%A5%EC%9D%B8-%EC%A0%95%EC%8B%A0-59b4d8d143ed>
<https://ko.wikipedia.org/wiki/%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81>
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTY1MzI3MTI3NF19
-->