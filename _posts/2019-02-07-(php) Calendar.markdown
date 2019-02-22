---
layout: post
title: "[php] php를 이용해서 달력 만들기"
subtitle: "php를 이용해서 달력 만들기"
categories: develog
tags: php calendar 기초
comments: true
header-img: "/img/posts/calendar/main.png"
---

### php 이용한 테이블 달력만들기

php로 달력을 만든다는 것은 아주 기초적인 일입니다.  
그래서 많은 사람들이 php에 적응하기 위해서 php를 사용하여 달력을 만듭니다.  

***

### 필요한 값과 가지고 있는 값

![calendar](https://jong-hui.github.io/assets/img/posts/calendar/main.png)

저는 어떤 기능을 만들든 현재의 상태를 아는것이 중요하다고 생각합니다.  
현재 저희는 달력을 만들때 어떤 게 필요한지 알아야 합니다.  
필요한 게 무엇인지 알고, 필요한걸 어떻게 만족해야 할지 생각해야 합니다.

*** 

### 필요한 값

1. 시작 요일 (현재 달의 1일은 어떤 요일인지)
2. 현재 달의 총 날짜
3. 현재 달의 총 주차
4. 현재 날짜(년, 월, 일)

***

1. 가장 먼저, *시작 요일*은 왜 필요할까요?  
예를 들어 현재 달의 1일이 금요일에 시작한다고 하면, 일요일부터 목요일까지는 공백(혹은 이전 달)으로 채워주고, 금요일부터 1일을 시작 해야겠죠.  
이 예에서는 금요일이 시작 요일입니다.  

2. 1일부터 시작한 상태에서 저희는 28일까지의 날짜만 보여줘야 합니다. *현재 달의 총 날짜*가 28이기 때문이죠

3. 2019년 2월같은 경우 총 주차는 5입니다, 5줄이 생성되기 때문이죠.  
2019년 3월같은 경우는 총 주차가 6이기 때문에 서로 다르게 표시 해줘야합니다.  
*현재 달의 총 주차*를 구하는 이유는 이 때문입니다.
![calendar](https://jong-hui.github.io/assets/img/posts/calendar/month3.png)
*2019년 3월은 총 주차가 6이다.*


4. 위에 적은 필요한 값들은 전부 *현재 날짜*만 알 수 있다면 모두 구할 수 있습니다.  
그러니 가지고 있는 값을 *현재 날짜*로 정하겠습니다.  
저희는 php에서 현재 날짜를 가질 수 있게 코딩 해야겠네요.

***

### 가지고 있는 값

달력을 만들기 전 저희는 현재 날짜를 GET형식을 이용하여 가져오고 보내줄 것 입니다.  
예를 들어 `localhost?year=2019&month=2` 형식의 주소로 현재 날짜를 구해주는 것이죠.

`index.php` 파일에 작성하도록 하겠습니다.  
전체 코드는 [이곳](https://github.com/jong-hui/php_calendar/blob/master/php_calendar/index.php)에서 보실 수 있습니다.

```php
<?php
	// GET으로 넘겨 받은 year값이 있다면 넘겨 받은걸 year변수에 적용하고 없다면 현재 년도
	$year = isset($_GET['year']) ? $_GET['year'] : date('Y');
	// GET으로 넘겨 받은 month값이 있다면 넘겨 받은걸 month변수에 적용하고 없다면 현재 월
	$month = isset($_GET['month']) ? $_GET['month'] : date('m');
?>

<?php echo "$year 년 $month 월" ?>
<!-- 현재가 1월이라 이전 달이 작년 12월인경우 -->
<?php if ($month == 1): ?>
	<!-- 작년 12월 -->
	<a href="/?year=<?php echo $year-1 ?>&month=12">이전 달</a>
<?php else: ?>
	<!-- 이번 년 이전 월 -->
	<a href="/?year=<?php echo $year ?>&month=<?php echo $month-1 ?>">이전 달</a>
<?php endif ?>

<!-- 현재가 12월이라 다음 달이 내년 1월인경우 -->
<?php if ($month == 12): ?>
	<!-- 내년 1월 -->
	<a href="/?year=<?php echo $year+1 ?>&month=1">다음 달</a>
<?php else: ?>
	<!-- 이번 년 다음 월 -->
	<a href="/?year=<?php echo $year ?>&month=<?php echo $month+1 ?>">다음 달</a>
<?php endif ?>
```

![주소창](https://jong-hui.github.io/assets/img/posts/calendar/주소창.png)
localhost에 접속하시면 이렇게 작동합니다.  
이 상태에서 다음달을 누르면 현재가 4월이니 5월로 가게되겠죠.

자 이제 저희는 현재 날짜를 구해서 변수 안에 넣었습니다.  
그러면 일단 필요한 값들을 모두 구해야겠네요.

1. 시작 요일 : php 함수중 하나인 date 함수를 통해 구할 수 있습니다.
2. 현재 달의 총 날짜 : 시작 요일과 마찬가지로 date 함수를 통해 구할 수 있습니다.
3. 현재 달의 총 주차 : 현재 달의 총 날짜와 시작 요일을 계산하면 구할 수 있습니다.

[date 함수](http://php.net/manual/en/function.date.php)를 짧게 설명하자면 총 두개의 매개변수를 가지고있고,  
첫번째 매개변수에는 받고싶은 타임포맷을 넣어줍니다(ex: Y-m-d)  
두번째 매개변수에는 기준점이 되는 시간을 [타임스탬프 형식](https://ko.wikipedia.org/wiki/%ED%83%80%EC%9E%84%EC%8A%A4%ED%83%AC%ED%94%84)으로 넣어주면 첫번째 매개변수에 해당하는 문자열을 리턴해줍니다.

저희는 date 함수 첫번쨰 매개변수에는 시작 요일, 현재 달의 총 날짜의 타임포맷을 적고 두번째에는 현재 날짜의 타임스탬프를 적어 필요한 값들을 가져오겠습니다.

```php
<?php
	$date = "$year-$month-01"; // 현재 날짜
	$time = strtotime($date); // 현재 날짜의 타임스탬프
	$start_week = date('w', $time); // 1. 시작 요일
	$total_day = date('t', $time); // 2. 현재 달의 총 날짜
	$total_week = ceil(($total_day + $start_week) / 7);  // 3. 현재 달의 총 주차
?>
```


***

이제 달력을 그릴 준비는 모두 끝났습니다.
저는 HTML table 태그를 사용하여 달력을 그리겠습니다.

```php
<table border="1">
	<tr> 
		<th>일</th> 
		<th>월</th> 
		<th>화</th> 
		<th>수</th> 
		<th>목</th> 
		<th>금</th> 
		<th>토</th> 
	</tr> 

	<!-- 총 주차를 반복합니다. -->
	<?php for ($n = 1, $i = 0; $i < $total_week; $i++): ?> 
		<tr> 
			<!-- 1일부터 7일 (한 주) -->
			<?php for ($k = 0; $k < 7; $k++): ?> 
				<td> 
					<!-- 시작 요일부터 마지막 날짜까지만 날짜를 보여주도록 -->
					<?php if ( ($n > 1 || $k >= $start_week) && ($total_day >= $n) ): ?>
						<!-- 현재 날짜를 보여주고 1씩 더해줌 -->
						<?php echo $n++ ?>
					<?php endif ?>
				</td> 
			<?php endfor; ?> 
		</tr> 
	<?php endfor; ?> 
</table>
```

### 결과
![결과](https://jong-hui.github.io/assets/img/posts/calendar/result.PNG)
해당 소스를 실행시킨 결과입니다.


### 외부링크

<https://github.com/jong-hui/php_calendar/blob/master/php_calendar/index.php>