---
layout: post
title: "[Javascript] 문법의 문맥, 실행 컨텍스트"
subtitle: "자바스크립트 문법에 대한 이해"
categories: devlog
tags: js javascript 실행컨텍스트 문법 execution_context
comments: true
---

# 문장의 문맥(Context)

> 문맥 | 어떤 주어진 언어표현이 나타나는 부분과 연관이 되는 언어적인 맥락.

## 실행 컨텍스트(Execution Context)

실행 컨텍스트란, 우리 말로 하자면 실행 문맥이라는 뜻 입니다. 자바스크립트의 핵심 원리중 하나이며 코드를 **독해**하거나, **이해**하는데에 꼭 필요한 요소입니다.  
사실, 문맥이라는 것은 어떤 언어에서든지 중요한 부분입니다. 그 언어가 자바스크립트라고 할지라도 말이죠. 문맥(Context)을 이해한다면 문장을 **이해**할 수 있고, 문장을 이해한다면 글을 **이해**할 수 있을 것 입니다.

먼저, 다음과 같은 코드가 있다고 생각하겠습니다.

```javascript
var a = 'A'

function foo() {
  var b = 'B'

  function bar() {
    var c = 'C'

    console.log(a, b, c)
  }

  bar()
}

foo()

// 실행 결과 : A B C
```
`위 코드는 전부 3개의 실행 컨텍스트가 만들어집니다`


-----

## 실행 컨텍스트 스택

![execution_context_stack_diagram](https://jong-hui.github.io/assets/img/posts/execution-context/1.png)
`3개의 실행 컨텍스트가 스택에 쌓이고, 소멸됩니다`

총 3개의 실행 컨텍스트는 스택에 쌓이고, 소멸됩니다. 가장 먼저 전역 컨텍스트가 생성이 되며 실행되고, 실행하는 순간에 다른 함수(_함수가 아닐 수도 있습니다_)가 실행되면 또 다른 실행 컨텍스트가 스택에 쌓입니다.  
이렇게 쌓여진 스택은, 나중에 들어온 것이 가장 빠르게 나가는 후입선출의 구조를 가집니다.

더 이상 쌓을 실행 컨텍스트가 없는 스택은 늦게 들어온 순서대로 활성화되어 소멸되며, 소멸되는 때에 자신(_소멸된_)을 실행시킨 실행 컨텍스트를 활성화 시키면서, 이 작업을 반복합니다.

## 실행 컨텍스트의 구조

![execution_context_structure](https://jong-hui.github.io/assets/img/posts/execution-context/2.png)

실행 컨텍스트는 위와 같은 객체로 간단히 설명할 수 있습니다. 컨텍스트에는 위 그림과 같은 속성들(_properties_)이 있습니다. 이 속성들은 컨텍스트의 상태라고 할 수 있습니다.


### 1. 변수 객체 (Variable Object)

Variable Object는, 실행 컨텍스트에서 선언된 변수 혹은 함수(_함수 표현식은 저장되지 않습니다_)들을 저장합니다.

Variable Object는 추상적인 개념이지만, 다른 컨텍스트 타입에서는 물리적으로 다른 객체를 사용하여 표시됩니다. 예를 들어, 전역 컨텍스트에서는 Variable Object이 전역 컨텍스트 그 자체 입니다. 그렇기 때문에 우리는 전역 객체의 속성 이름을 통하여 전역 변수를 참조할 수 있습니다.


#### 1.1 활성화 객체 (Activation Object)

Activation Object는, 함수 컨텍스트가 활성화(_함수가 호출_)될 때 만들어지는 특수 객체입니다. 

이 Activation Object는 매개변수(_parameter_)와 전달인자(_argument_)로 이루어져 있습니다. 또한, Activation Object는 함수 컨텍스트(_함수로 호출된 실행 컨텍스트_)의 Variable Object로 사용됩니다.  
즉, 함수 컨텍스트의 Variable Object는 동일하게 간단한 변수 객체이지만, 변수와 함수 이외에도 매개변수와 전달인자를 저장하며 Activation Object라고 합니다.

![activation_object_structure](https://jong-hui.github.io/assets/img/posts/execution-context/1.png)


### 2. 스코프 체인

스코프 체인은 컨텍스트의 코드들을 검색하는 객체의 목록입니다. 만약 해당 실행 컨텍스트에 a라는 변수를 선언했고, 이를 찾고자 할 때 스코프 체인에서 검색하는 것 입니다.  
이 스코프 체인에서 만약 검색에 실패했다면, 부모 컨텍스트(_해당 컨텍스트를 실행시킨_)에서 검색을 합니다. 그렇게 계속 반복되며 결국 전역 컨텍스트까지 올라가게 됩니다. 만약 전역 컨텍스트에서도 검색에 실패한다면, 자바스크립트 엔진은 저희에게 오류를 줄 것입니다.  
위 예제 코드의 `bar()`에서 해당 컨텍스트(_bar()_)에서 선언한 변수가 아니어도 쓸 수 있는 이유는 이 스코프 체인의 특성 때문입니다.  
또한 스코프 체인은 함수의 `[[scope]]`를 통해 접근할 수 있습니다.

검색되는 대상은:
- 선언된 변수명
- 선언된 함수명
- 매개변수
- 등등..

### 3. 

# 작성중입니다....ㅜㅜ

## 외부링크

[http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#execution-context](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#execution-context)