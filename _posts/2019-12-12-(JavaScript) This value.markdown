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
이 게시글에서는 어떤 상황(\_문맥\_)에 존재하는 `this`의 값이 어떻게 변하는지 설명합니다. `this`를 파악하면, 더 좋은 품질의 자바스크립트 웹/앱을 작성하실 수 있을 겁니다.  
이제 `this`를 알아봅시다! 지금 바로 (크롬 브라우저에서) `F12`를 누르고 스크롤을 내리시며 저만 따라오세요.

------------

## this란

객체는 자바스크립트에서 중요한 개념중 하나입니다. 거의 모든 값들은 객체로 이루어져있습니다. `this`또한 객체인데요, 자바스크립트 코드를 쓰시다면 어느 곳에서든 `this`를 호출하실 수 있을 겁니다. 아 참, 알아두셔야 할 게 하나 더 있습니다! `this`는 **실행 방식**에 따라 값이 변합니다!

## 인터프린터와 실행컨텍스트

자바스크립트는 스크립트 언어입니다. 즉, 컴파일 과정이 없다는 걸 의미합니다. 컴파일러가 없는 대신, 인터프린터가 있습니다. 이 인터프린터는 코드를 읽고 한줄 씩 실행합니다. 코드가 실행되는 환경을 [실행 컨텍스트](https://jong-hui.github.io/devlog/2019/11/13/execution-context/)라고 합니다. 그리고 `this`는 이 실행 컨텍스트가 변경될 때마다 변경됩니다.

> [문법의 문맥, 실행 컨텍스트](https://jong-hui.github.io/devlog/2019/11/13/execution-context/)
