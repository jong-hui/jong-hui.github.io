---
layout: post
title: "[Javascript] 중첩 삼항 연산자는 정말 읽기 힘든 걸까?"
subtitle: "중첩 삼항 연산자를 기피하는 건 그저 편견 아닐까?"
categories: devlog
tags: js javascript 삼항연산자 중첩 nested ternaries operation
comments: true
header-img: "/img/posts/nested-ternaries-operation/90004907-650f5280-dcd1-11ea-956f-57ca2a4ebe6f.png"
---

# 중첩 삼항 연산자를 싫어하는 건 편견이다.


![중첩 삼항 연산자를 사용한 예시](https://user-images.githubusercontent.com/42797995/90004907-650f5280-dcd1-11ea-956f-57ca2a4ebe6f.png)

> 편견 | 공정하지 못하고 한쪽으로 치우친 생각.

## 중첩 삼항 연산자를 싫어하는 건 편견이다.

중첩 삼항 연사자를 사용한 코드를 보면, 바로 눈살을 찌푸리는 사람들이 있다. 거의 모든 사람들이 그럴 것이다.  
하지만, 편견을 버리고, 중첩 삼항 연산자를 잘만 쓰면, 다른 코드로 쓴 것보다 좋은 코드를 작성할 수 있다.

--------

## 삼항 연산자는 simple하다.

> simple is best

먼저, 본론으로 들어가기 전에, 삼항 연산자가 얼마나 좋은지 설명을 해야할 것 같다.  
어떤 값이 `true`일 때에 다른 함수를 구현하고 싶을 때, if문으로 해당 기능을 구현하면 다음과 같다.

![if문을 사용한 간단한 예시](https://user-images.githubusercontent.com/42797995/90005746-9ccaca00-dcd2-11ea-996b-c7245df28bc8.png)

이걸 다시 `삼항 연산자`를 사용하여 구현하면 다음과 같다.

![삼항 연산자를 사용한 간단한 예시](https://user-images.githubusercontent.com/42797995/90005953-fe8b3400-dcd2-11ea-977a-839e35d3cbbf.png)

누가봐도, 삼항 연산자를 사용한 코드가 **가독성이 좋은 코드**라고 말할 것이다.  
이렇 듯, 삼항 연산자는 올바르게 사용하면 많은 이점이 있다.

--------

## 편견은 그냥 생기는 게 아니다.

이런 경험이 있을 것이다. 중첩 삼항 연산자를 사용한 코드를 보며, 머리를 싸매는 경험 말이다. 사실 그런 코드들은, 작성자가 삼항 연산자를 잘못 사용하고 있었을 가능성이 매우 크다.

![삼항 연산자를 안 좋게 사용한 예시](https://user-images.githubusercontent.com/42797995/90007074-06e46e80-dcd5-11ea-97a9-95e378a39cae.png)

위의 코드를 살펴보자, 그리고 이 코드를 이해하려고 시도해보자. 분명 이해하기 힘들 것이다. 나도 이 코드를 수정하면서 회의감을 많이 느꼈다.  
우리는 이런 안 좋은 사례들을 목격하면서 무의식 속에는 자연스레 `중첩 삼항 연산자는 나쁜 것`라는 편견이 자리잡게 된 것이다.  

> 삼항 연산자는 잘못 없어요.


--------

## 어떻게 써야 좋게 썻다고 소문이 날까?

사실, 시야를 좀 넓히면 삼항 연산자를 사용할 기회는 많아질 수 있다.  


다음과 같은 코드가 있다고 생각해보자. 해당 코드는 사용자의 상태에 따라 추가 포인트를 정해주는 기능을 한다.

![if문과 let을 사용한 예시](https://user-images.githubusercontent.com/42797995/90007599-fe406800-dcd5-11ea-80d3-be61be741b22.png)

해당 코드는, 상황에 따라 포인트를 다르게 주기 위해서 `if` 그리고, `let` 키워드를 사용했다. 지금 코드도 충분히 읽기 좋지만, 삼항연산자로 좀 더 좋은 코드로 만들 수 있다.

![const와 삼함 연산자를 사용한 예시](https://user-images.githubusercontent.com/42797995/90007918-86bf0880-dcd6-11ea-915b-a6a5ca2e0880.png)

삼항 연산자를 충분히 이해하고 있다면, 이 코드가 더 읽기 좋다고 생각한다.  
먼저, 삼항 연산자를 사용함으로써 우리는 `let`을 지우고 `const`를 사용할 수 있다.<sup>[let VS const](https://ui.dev/var-let-const/)</sup> 또, 코드는 더 적게 씀으로써 버그를 줄일 수 있다.<sup>[less code, less bugs](https://functionalsoftware.net/less-code-and-less-bugs-with-functional-programming-languages-589/)</sup>


-------

## 코드도 호불호가 갈린다?

![삼항 연산자를 사용한 예시](https://user-images.githubusercontent.com/42797995/90004907-650f5280-dcd1-11ea-956f-57ca2a4ebe6f.png)

해당 코드를 개발자 커뮤니티에 올리고, 의견을 물어본 적이 있었다. 그때의 반응은 이러하였다.

- 저는 아주 싫어합니다. 가독성이 너무 안좋음
- 구조분해 안되나염
- 3항두개이상이면 if로..
- 진심 저런거 너무 싫어요
- 근데 힙하다. 힙한 코드 좋아

사실 이런 의견들에 주눅들었었다. 나는 읽기 괜찮은 코드라고 생각했는데, 반응은 처참하였으니까. 그래서 좀 찾아봤는데, 중첩 삼항 연산자를 좋아하는 분들도 좀 있더라.<sup>[박수 6.7K를 받은 medium Nested Ternaries are Great](https://medium.com/javascript-scene/nested-ternaries-are-great-361bddd0f340)</sup>  
사실 좀 안심했다. 내가 이상한 건 아니구나 싶어서, 사람들마다 호불호가 다 있으니까. 협업에서는 호불호가 있는 이런 코드는 지양하는 편이 맞을 것 같기도 하다.


## 결론

본인(팀)한테 맞는 코딩 스타일을 쓰도록 하자.

> The Best Code is No Code At All
> Less code = less surface area for bugs = fewer bugs.