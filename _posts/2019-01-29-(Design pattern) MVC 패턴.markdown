---
layout: post
title: "[Design pattern] MVC 패턴"
subtitle: "MVC 패턴"
categories: tech
tags: SoftwareDesignPattern mvc mvvc mvp
comments: true
header-img: "/img/posts/mvc-pattern.jpg"
---

모델-뷰-컨트롤러
===============

> 비지니스 로직 서로 영향 없이 쉽게 고칠 수 있는 웹앱 만들기.

웹앱을 만들수록 우리가 만든코드들은 이해하기 힘들어집니다.
이해하기 힘들어지면 코드의 수정은 어려워지고 결국 문제점이 발견됩니다.
이러한 문제를 해결하기 위해 우리는 많은 소프트웨어 아키텍처 패턴을 가지고있고, 그 중 하나가 MVC입니다.

***

## M-V-C ?

MVC, 즉 모델-뷰-컨트롤러를 뜻하는 말 입니다.
우리는 하나의 웹앱에서 각자가 하는 일에 따라(*기능에 따라*) 장소를 나누어 봤습니다.
이번시간에 다루는 아키텍처 패턴에서는 총 세 장소로 나누어 집니다.

각각 모델, 뷰, 컨트롤러입니다.


### 모델 (Model)

