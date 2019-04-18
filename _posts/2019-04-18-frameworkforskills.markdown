---
layout: post
title: "기능대회 프레임워크 사용법"
subtitle: "기능대회를 위한 프레임워크를 100% 사용하는 방법"
categories: devlog
tags: php framework
comments: true
---


# 짭라벨 사용법

## 들어가기 전

웹 디자인 및 개발 기능대회에서 쓰이는 [프레임워크](https://github.com/jong-hui/framework-for-skills)를 제작하였습니다.  
사용법을 이 포스팅을 통해 적도록 하겠습니다.  
version 1을 기준으로 포스팅하도록 하겠습니다.  

## 1. Route

- 라우팅에 대한 부분은 모두 `/App/http/web.php`에서 이루어집니다.  
- 상황에 대한 예제를 들어 설명하겠습니다.  
- 모든 코드는 `/App/http/web.php` 에 있는 `new Route()` 가 실행되기 전에 적어주어야 합니다.

### 라우팅의 기본 구성

`기본구성`
```php
Route::get("/register", function() {
	return ["register"];
});
```

- GET `/register` 요청을 들어왓을 때 두 번째 인자로 보내주는 콜백을 실행 시킵니다.
- 콜백의 **결과값**에 따라 **행동**이 달라집니다.

#### 콜백의 결과값

콜백은 무조건 배열을 리턴 해야합니다.  
콜백의 결과값은 크게 **두가지**의 종류로 나눌 수 있습니다.  

1. 알림창을 띄어주고 리다이렉션.
2. 템플릿을 보여줍니다.

보통, 1번째의 경우는 post로 들어오는 경우에 사용합니다.  
예를 들어 회원가입 버튼을 눌렀을 때 `회원가입이 완료되었습니다.`와 같은 메시지와 함께 리다이렉션이 되는 경우입니다.  

```php
Route::post("register", function() {
	//     [알림 메시지, 리다이렉션 페이지]
	return ["회원가입이 완료되었습니다.", "/"];
});
```

---

또 2번째의 경우는 get으로 들어오는 요청에서 사용합니다.  
메인페이지나 상품리스트 페이지와 같이 템플릿(View)을 보여줘야 할 때입니다.

```php
Route::get("register", function() {
	//     [템플릿이름(View폴더), $data = []]
	return ["register"];
});
```

물론 라라벨처럼 템플릿에 값을 넘겨줘서 사용 할 수 있습니다.  


```php
/App/Http/web.php
Route::get("", function() {
	return ["index", [
		"sitename" => "Webskills blog"
	]];
});


/App/View/index.php
<p> 안녕하세요, <?php echo $sitename ?> 입니다. </p>
```

---

### 권한 설정

사이트를 제작할 때, 권한에 따라 행동을 달리 해야할 때가 있습니다.  
어드민만 어드민페이지에 접근 가능하게 해야 한다던가 하는 번거로운 작업을 쉽게 처리할 수 있습니다.

```php
/*
	0 = 비회원
	1 = 회원
	2 = 어드민
*/
$level = DB::Users()->getLevel();

switch ($level) {
	case 0: // 비회원 라우팅
		Route::get("", function() {
			return ["index"];
		});
	break;
	
	case 1: // 회원 라우팅
		Route::get("/mypage", function() {
			return ["mypage"];
		});
	break;
	
	case 2: // 어드민 라우팅
		Route::get("/admin", function() {
			return ["admin"];
		});
	break;
}
```

위와 같은 형식으로 `web.php`를 작성한다면, 비회원은 어드민 권한이 필요한 페이지에 접근하지 못할 것 입니다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNDQ4OTgxMDk5XX0=
-->