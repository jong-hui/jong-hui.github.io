---
layout: post
title: "[Javascript] React Native best practice #1"
subtitle: "React Native 모범사례 #1"
categories: devlog
tags: js javascript react react-native ReactNative practice tutorial
comments: true
header-img: "/img/header_imgs/ReactiveInJS.png"
---

# React Native best practice

해당 게시물에서는 React Native 앱을 구성하는 올바른 방법에 대해 설명합니다. (내 생각)  
먼저, 해당 게시물(#1)에서는 앱에서 쓰이는 **라이브러리**에 대해 설명합니다. 각각의 라이브러리들을 소개하고, **왜 써야하는지**. 어떤 점이 **좋고** 또 어떤 점이 **나쁜지** 등을 서술합니다.

> 분명 제 글보다 좋은 사례는 있을 것입니다. 의견은 아래에 댓글 기능을 활용해주세요.

--------

## 먼저

먼저, React Native 생태계는 몇년간 계속 발전되어 **수도 없이 많은** 라이브러리들이 배포되어 있습니다.  
앱에 들어가는 기본적인 기능들은 이제 모두 **DRY하게** 라이브러리를 사용하여 구현할 수 있다는 의미입니다.

- [awesome-reactnative](https://github.com/jondot/awesome-react-native)
- [awesome-reactnative-ui](https://github.com/madhavanmalolan/awesome-reactnative-ui)

많은 라이브러리를 대충대충 눈으로 훑어 어떤 라이브러리들이 있는지만 알아도, 개발을 편하게 할 수 있습니다.  


## 0. React Native

### [React Native](https://github.com/facebook/react-native)

먼저, React Native입니다. React Native 앱을 만드는데에는 필수겠죠?  

개인적으로, expo를 사용하여 앱을 개발하는 것은 추천드리지 **않습니다**. 나중에는 결국 eject를 사용해서 분리해줘야 하는 순간이 분명 올 것인데, 이왕 할거 처음부터 빼고하자는 생각입니다. expo를 빼도 어렵지 않아요.


## 0.5(?). Typescript

### [Typescript](https://github.com/Microsoft/TypeScript)

Typescript 입니다. 이 게시물을 들어오신 React Native 개발자 분들은 모두 이 이름 한 번쯤은 들어보셨을 겁니다.  
왜 1이 아니고 0.5(?) 인가, 있으면 좋지만 없어도 soso하다고 생각합니다. 공식문서에 [적용법](https://reactnative.dev/docs/typescript)이 적혀있으니 적용도 쉽습니다.   

#### 있으면 왜 좋을까?

- VSCode의 자동완성
  - VSCode와 typescript의 조합은 정말 좋습니다.. 좋아요 컴포넌트에 prop을 넘겨줄 때도 쉽게 파악할 수 있고, 암튼 개발 속도가 향상됩니다. (타입 쓰느라 시간 걸리지만)
- 오류 하이라이팅
  - VSCode에선 자동으로 타입체킹을 해줍니다. 그러니까 빌드해서 확인할 부분들을 에디터에서 잡아줄 수 있습니다.
- 다른 사람들이 코드를 이해하기 더 쉽습니다.
  - 따로 문서화하지 않아도 Type을 적어두면, Code가 문서입니다.

[출처](https://blog.bitsrc.io/why-and-how-use-typescript-in-your-react-app-60e8987be8de)

-----------------------

## 1. React-navigation

### [React-navigation](https://github.com/react-navigation)

라우팅 라이브러리인 React-navigation입니다. 좋은 대체재로는 React-native-navigation이 있지만, native stack이 지원되지 않고, 스타수가 약 7000개 이상 차이납니다(2020-06-13 기준).  
문서도 잘 되어있고, 커뮤니티도 활발한 편입니다. 무엇보다 react native에서 실제 android, ios의 native stack(Fragment, UIViewController)를 사용할 수 있는 점이 좋았습니다.  
왜 좋냐면, React Native앱에서 React Native 티가 잘 안납니다. 즉, **Native앱과 비슷하게** 보인다는 것이죠.  
만약 os가 업그레이드 되어 stack animation이 바뀌어도 native stack을 쓰면 기존 Native앱과 똑같이 잘 반영됩니다.

[createNativeStackNavigator](https://reactnavigation.org/docs/native-stack-navigator/)

-----------------------

## 2. Mobx

### [Mobx](https://github.com/mobxjs/mobx)

상태관리 라이브러리인 Mobx입니다.  
비단 React Native에서만이 아닌 React에서 상태관리는 큰 이슈입니다. 앱이 조금만 커져도 상태를 관리하기 어려워지기 때문이죠.  
상태관리 라이브러리로는 Redux도 있습니다. 물론 좋은 선택지이지만 저는 다음과 같은 이유로 Redux 선택하지 않았습니다.

#### Redux는

1. 어렵다.
  - 어렵다는 건, 난해하다는 걸 의미합니다. 상태를 변경하려면 따로 파일을 만들고 그에 해당하는 보일러플레이트(상용구)코드가 너무 많습니다.
2. mobx에 비해 약한 Reactive, Functional
  - Redux는 Functional Programming, Reactive Programming을 모두 채택한 라이브러리입니다. 하지만 mobx에 비하면 떨어진다고 생각했습니다. 이 부분은 Mobx게시물에서 따로 다룰 예정입니다.
3. 불변성 유지
  - 불변성 유지는 중요한 부분이지만, 귀찮은 것은 사실입니다. Mobx에서는 불변성을 신경쓰지 않아도 괜찮습니다. (신경쓰지 않아서(= 그렇게 설계되어) 불편한 점도 있습니다.)

와 같은 이유로 Redux 대신 Mobx를 채택했지만, Redux도 좋은 선택지라고 선택합니다.  
어쩌다보니 Redux 얘기를 더 많이 했는데, Mobx에 대한 얘기는 따로 포스팅을 통해 빼겠습니다.


## 2.1. Mobx-persist

### [Mobx-persist](https://github.com/pinqy520/mobx-persist)

앱을 껏다 켰을 때 상태가 **유지**될 수 있도록 해줍니다. 직접 구현하려다가 스트레스를 이만저만 받은 게 아닙니다.. 덕분에 공부도 많이했지만, 일단 씁시다.

-----------

## 3. axios

### [axios](https://github.com/axios/axios)

말이 필요할까요? http 통신을 위한 최고의 라이브러리입니다. `fetch API`를 통해 통신할 수 있겠지만,  
`intercept`기능과 `transform` 그리고 `에러 핸들링`기능은 놓칠 수 없는 편함입니다.  
global intercept 기능을 만들어 주지 않는 건 좀 아쉽다. [이슈](https://github.com/axios/axios/issues/993)


----------

## 4. styled-components

### [styled-components](https://styled-components.com/)

CSS-in-JS의 styled-components입니다. CSS-in-JS를 사용하면 많은 장점들이 있겠지만 가장 큰 이유는 다음과 같습니다.  

- Prop에 따른 styling 적용
  - `<MyButton variant="primary" />`, `<MyButton variant="**warning**" />`와 같은 상황에서 쉽게 분기처리 할 수 있습니다.
- 변경되는 스타일 속성
  - 앱의 상태에 따라 스타일이 다르게 보여야할 순간이 있습니다. 예를 들어 다크모드 같은. 아주 쉽게 처리 가능합니다.
- Root Theme의 사용
  - 한 곳에서 값을 끌어다 사용할 수 있습니다. 한 번만 바꿔줘도 전부 적용됩니다.

하지만 웹에 비해 React Native에선 이런 부분들이 좀 아쉬웠습니다.

- Sass 선택자 불가
  - 예를들어 `& > div`와 같은 선택자는 사용 불가능합니다.
- 안드로이드에서 세세한 shadow 불가
  - ios에선 shadow-opacity 같은 속성으로 세세한 shadow를 적용할 수 있지만, 안드로이드에서는 `elevation`만 가능합니다. 좋은 방법이 있다면 알려주세요 제발 ㅜ



타입스크립트는 다음과 같은 방법으로 지원할 수 있습니다.
```javascript
import styled from 'styled-components/native'

interface MyProps {
  width: number
}

const MyView = styled.View<MyProps>`
  width: ${({theme, width}) => width}px
`
// or
const MyView = (styled(MyCustomComponent).attrs({ variant: 'section' })<MyProps>`
  width: ${({theme, width}) => width}px
`)
```

------------

## 5. react-hook-form

### [react-hook-form](https://react-hook-form.com/)

React에서 form을 관리하기 위한 [라](https://github.com/jaredpalmer/formik)[이](https://github.com/final-form/react-final-form)[브](https://github.com/foxhound87/mobx-react-form)[러](https://github.com/tannerlinsley/react-form)[리](https://github.com/formsy/formsy-react/)들이 많지만, 일단 **hooks**로 구현된게 마음에 들었고, 사용법도 괜찮았고(공식문서에 react native 탭이 있다), 타입스크립트 또한 제공됩니다.  
mobx-react-form과 비교를 하며 써봤는데 React Native, Typescript 환경에서는 쓰기 적합하지 않은 것 같아서 채택하지 않았는데, react-hook-form을 사용할 땐 Mobx와 직접 binding을 해줘야해서 좀 아쉬운 부분입니다..  
또한, [laravel validation](https://laravel.com/docs/7.x/validation)이 제공되는 [validatorjs](https://www.npmjs.com/package/validatorjs)와 같이 사용했는데, laravel validation을 사용하던 입장에서 좋은 경험이였다.


-----------

## 6. react-native-animatable

### [react-native-animatable](https://github.com/oblador/react-native-animatable)

간단한 애니메이션들을 쉽게 구현할 수 있게 도와줍니다.  
무한 애니메이션을 적용할 수 있고, 애니메이샨을 css keyframe와 비슷하게 선언할 수 있습니다. 

--------

## UI 라이브러리

React Native도 Material과 같은 UI 프레임워크(?)들이 있습니다. 그런 걸 사용하셔도 좋고, 작은 라이브러리들만 불러와 사용하셔도 좋습니다.  
아래는 제가 사용하는 UI 라이브러리들입니다.

- [react-native-in-app-message](https://github.com/KirillGudkov/react-native-in-app-message) = in app message를 랩핑해준 라이브러리입니다.
- [reanimated-bottom-sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet) = bottom sheet UI를 쉽게 구현할 수 있습니다.
- [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen) = UI 라이브러리 라고 하기엔 뭐하지만, Splash screen을 컨트롤할 수 있습니다.

--------

## 그 외

- [react-native-keychain](https://github.com/oblador/react-native-keychain) = 민감한 정보들을 AsyncStorage대신 이 라이브러리를 통해 저장할 수 있습니다.
- [axios-retry](https://github.com/softonic/axios-retry) = 제곧내