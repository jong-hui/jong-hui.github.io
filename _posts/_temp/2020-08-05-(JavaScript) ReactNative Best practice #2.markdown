---
layout: post
title: "[Javascript] React Native 모범 사례 #2"
subtitle: "React Native 모범 사례 #2"
categories: devlog
tags: js javascript react react-native ReactNative practice tutorial
comments: true
header-img: "/img/posts/reactnativepractice/React_Native_Best_Practice.png"
---

# React Native best practice


> [React Native best practice #1](https://jong-hui.github.io/devlog/2020/06/13/(JavaScript)-ReactNative-Best-practice-1/)

해당 게시물에서는 React Native 앱을 구성하는 올바른 방법에 대해 설명합니다. (내 생각)  
해당 게시물(#2)에서는 프로젝트의 폴더 구조, 파일 생성규칙 그리고 코딩 컨벤션에 대해 서술합니다.

> 분명 제 글보다 좋은 사례는 있을 것입니다. 의견은 아래에 댓글 기능을 활용해주세요.

--------

## 먼저

실제로 프로젝트 초기에 **프로젝트 폴더 구조**는 높은 우선순위를 가진 작업이 아닙니다. 많은 사람들이 별로 중요하지 않다고 생각하며, 모범 사례를 무시하는 경향이 있습니다.  
폴더 구조를 무시하는 건, 개발자가 빠르게 코드를 작성할 수 있게 해주지만, 장기적으로 코드 유지보수에 더 많은 시간을 투자하게 될 것입니다.  


### 피해야할 폴더 구조

폴더 구조를 생각하기 전에, 폴더 구조에 대해 깊이 고민해야 할 필요성을 느껴보는 것이 좋겠습니다.  

```
src/
  index.js
  mobile/
    imports/
      etc/
        myHook.js
        myService.js
      startup/
        index.js
      ui/
        {projectName}/
          약 50개 정도의 컴포넌트 폴더들
        screens/
          App/
          ...
      core/
        etc/ 
          myHook.js
          myService.js
        hocs/
          etc/
        startup/
          index.js
        ui/
          {projectName}/
            약 50개 정도의 컴포넌트 폴더들
          screens/
            App/
            ...
  ...
```
이런 폴더 구조의 legacy코드를 받은 적이 있었고, 그때 느꼈던 단점들을 나열하자면 다음과 같습니다.

1. 없어도 될 뎁스가 너무 많습니다. 어떤 것이든, 불필요한 내용은 그냥 없는게 낫습니다다.
2. etc 폴더에 있는 파일들은 도대체 어떤 역할을 하는지 알기 어렵습니다.
3. ui 폴더가 중복되는데, 왜 중복되는지 알 수 없어서 혼란스럽습니다.
4. 작은 단위(Button), 큰 단위(ProductCard)컴포넌트 들이 모두 같은 폴더에 담겨져 있었습니다.

### 좋은 폴더 구조

위의 피해야할 폴더 구조를 보기좋게, 유지보수가 용이하게 바꾸자면 다음과 같습니다.

```
src/
  index.js
  *startup* -> setupForLaunch/
  components/
    atoms/
      InputTextField/
      Button/
    molecules/
      FloatingButton/
    organisms/
      ProductCard/
    templates/
      JoinOrLogin/
  screens/
    App/
  hooks/
  services/
  utils/
```

1. 불필요한 뎁스를 모두 제거했습니다. 이제 더이상 core, mobile 그리고 imports 같은 폴더들이 왜 이렇게 모호한 이름을 가졌는지 유추하지 않아도 됩니다.
2. etc 폴더를 제거하고 파일들은 각자 역할에 맞는 폴더(hooks, services, utils)에 옮겼습니다. 이제 더이상 "그 외", "기타" 라는 감히 유추할 수 없는 이름을 보지 않아도 됩니다.
3. ui폴더를 삭제했습니다. 고백하자면, 아직도 왜 중복되어 있는지 알지 못합니다.
4. 컴포넌트들은 [Atomic design](https://brunch.co.kr/@ultra0034/63) 방법론에 맞게 정리했습니다. 버튼 같이 작은 단위들은 Atom으로, 큰 단위들은 molecule 또는 organism로 옮겼습니다.


### 더 좋은 폴더 구조

자, 이제 이전에 폴더 구조들은 모두 잊어버리세요, 
