---
layout: post
title: "[Javascript] Lodash 라이브러리 직접 구현해보기"
subtitle: "자바스크립트 유틸리티 직접 구현"
categories: devlog
tags: js javascript lodash unique utility underscore shuffle uniq chunk difference
comments: true
---

# Lodash

## Lodash

Lodash는 자바스크립트 **유틸리티 라이브러리**입니다. 데이터를 쉽게 다룰 수 있도록 도와주고, 배열과 객체를 핸들링할 때 유용합니다. 유사 라이브러리로는 [underscore](https://underscorejs.org/)가 있습니다.  
또한, Lodash는 자바스크립트로 작성된 어느 프로그램에 써도 유용하게 작동하여 라이브러리 중 **[가장 많은 인기](https://gist.github.com/anvaka/8e8fa57c7ee1350e3491)**를 가지고 있습니다.

## 직접 구현해보기

자바스크립트로 프로그램을 작성하며 써보기만 했지, 작동되는 실제 코드가 어떻게 구성되어 있는지 잘 모르는 경우가 있습니다.  
이 게시글을 통해 "내가 쓰고 있는 건 **대충** 이런 식으로 작동하는구나~" 라는 느낌만 전해드리고 싶습니다. 
아래에서는 구현하며 사용했던 메서드와 함수들을 링크해놨으니, 모르는 함수가 있다면 링크를 통해 알아보시기 바랍니다.

## 글에 들어가기 전

> 해당 글을 읽기 전, 먼저 알아야할 문법들이 있습니다. 몰라도 상관은 없지만, 읽으면서 불편함을 느끼신다면 읽어보시길 권장합니다.

- [Class 문법](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
- [화살표 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)
- [전개 구문(...)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

-------

## Lodash 메서드

### shuffle

`shuffle`은 배열을 무작위로 섞어줍니다. 만약 `[1, 2, 3, 4]`의 배열이 있다면, `[3, 2, 4, 1]`과 같은 섞어진 배열을 반환해줍니다.  
이 메서드는 다음과 같이 구현할 수 있습니다.

```javascript
class _ {
  static shuffle (array) {
    return array.sort(() => Math.random() > 0.5 ? 1 : -1);
  }
}

console.log(_.shuffle([1, 2, 3, 4])) // [3, 2, 4, 1]
```

[sort 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)와 [Math.random](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random)함수를 사용하여 무작위로 배열을 섞어주었습니다.


### uniq

`uniq`은 배열의 중복 값을 제거해서 값을 유니크하게 해줍니다. 만약 `[1, 2, 2]`가 있다면, `[1, 2]`를 반환해줍니다.

```javascript
class _ {
  static uniq (array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }
}

console.log(_.uniq([1, 2, 2])) // [1, 2]
```

[filter 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)와 [indexOf 메서드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)를 사용하여 구현했습니다.  
indexOf는 배열내에 존재하는 값에서 가장 처음에 찾은(_첫 번째_)인덱스를 반환하기 때문에, 가장 처음 값만 `true`여서 필터링되지 않고, 두번 째 부터는 `false`이기 때문에 필터링돼 무시됩니다.


### chunk

`chunk`는 배열을 N만큼의 사이즈로 청크화 합니다. 만약 배열 `[1, 2, 3, 4, 5]`와 사이즈 `2`가 있다면, `[[1, 2], [3, 4], [5]]`를 반환해줍니다.

```javascript
class _ {
  static chunk (array, size = 1) {
    return array.reduce((acc, value, index) => {
      const chunkIndex = ~~(index / size);

      acc[chunkIndex] = [...(acc[chunkIndex] || []), value];

      return acc;
    }, []);
  }
}

console.log(_.chunk([1, 2, 3, 4, 5])) // [[1, 2], [3, 4], [5]]
```

[reduce](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)메서드를 사용하여 구현했습니다.  
먼저, `reduce`로 빈 배열을 하나 만들고, 빈 배열의 `넣을 배열의 인덱스 / 사이즈`(_chunkIndex_)에 값을 넣어줘서 청크화합니다.  
> ~~는 [double tilde 연산자](http://rocha.la/JavaScript-bitwise-operators-in-practice)입니다.(_가독성이 떨어져 사용을 지양합니다_)

### difference

`difference`는 두 배열간의 중복값을 제거해줍니다. 만약 배열 `[1, 2, 3, 4]`와 또 다른 배열 `[1, 2, 3]`이 있다면, `[4]`를 반환해줍니다.

```javascript
class _ {
  static difference (array, target = []) {
    return array.filter((item) => !(~target.indexOf(item)));
  }
}

console.log(_.difference([1, 2, 3, 4], [1, 2, 3])) // [4]
```

[_.uniq](#uniq)에서 썼던 `filter 메서드`와, `indexOf 메서드`를 여기서도 사용했습니다.  
먼저 기준이 되는 배열으로 filter를 하고, 타겟 배열에 해당 값이 존재 한다면 `false`를 반환해 필터링해줬습니다.

> ~는 [tilde 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT)입니다.

-----------

## 정리

Lodash에서 사용되는 메서드들을 함수형 프로그래밍 방식으로 직접 구현해보면서, 자바스크립트 내부 함수에 대한 이해도를 더 높일 수 있을 거라 생각합니다.  
제가 제시한 방법 말고도, 구현하는 데에는 **아주 많은 방법**이 있으므로, 스스로 한번 구현해보는 것도 나쁘지 않다고 생각합니다.  
실제 Lodash에서는 구현로직 뿐만 아니라, 예외처리나, 캐싱, 메모이제이션 등등 많은 로직들이 포함되어 있습니다. 시간이 나신다면 [Lodash](https://github.com/lodash/lodash)에서 구현로직도 보시는 걸 추천드립니다.

## 끝으로

순간 Lodash를 직접 구현하는 걸 포스팅 하면 읽는 사람들도 흥미를 느낄 수 있고, 나 또한 배울 수 있을 것 같아서 포스팅해봤다.  
간단한 핸들링은 ES5, ES6 문법만으로도 쉽게 구현할 수 있으므로, 복잡한 핸들링이 필요한게 아니라면 Lodash를 배우며 사용하지 않아도 될 것 같긴하다. 물론, 성능적인 부분이나 예외처리는 Lodash가 뛰어나다.