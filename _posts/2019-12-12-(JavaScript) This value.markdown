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
