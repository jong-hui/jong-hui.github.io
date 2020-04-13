---
layout: post
title: "[Android] Kotlin을 더 쉽게, Anko하자"
subtitle: "Anko 라이브러리에 대해"
categories: devlog
tags: android Kotlin Anko
comments: true
header-img: "/img/header_imgs/anko.png"
---

# Anko

블로그의 제목이 "웹을 탐험하는 블로그" 입니다, 저도 한달 전 까지만 해도 저가 웹만 할 줄 알았습니다만, 세상에서 가장 어려운 게 생각한 대로 사는 거라고 합니다.  
웹만 3년동안 파다가 안드로이드와 IOS 개발을 시작하게 되었습니다. (각각 Kotlin, Swift) 이 과정에서 저에게 도움 됐던 라이브러리인 `Anko`에 대해 소개해보려고 합니다.


## 소개

> [Anko](https://github.com/Kotlin/anko) | Pleasant Android application development[= 쾌적한 Android 애플리케이션 개발]

Anko 공식 깃허브를 보면 "**쾌적한** Android 애플리케이션 개발"을 위한 라이브러리라고 소개되어있습니다.  
실제로 안드로이드 프로젝트에 Anko를 적용하면 코드를 더 깨끗하게, 알아보기 쉽게 작성할 수 있었습니다.

다음에 Anko를 쓰지 않고 구현한 Toast메시지와 쓰고 구현한 Toast메시지가 있습니다.

```kotlin
// Anko를 쓰지 않은 Toast메시지
Toast.makeText(Context, "Toast Message", Toast.LENGTH_SHORT).show()

// Anko를 쓴 Toast메시지
toast("Toast Message")
```

브라우저에서는 `alert()` API만 쓰면 되는 걸 안드로이드에서는 길고 구차하게 풀어써줘야 해서 암걸렸는데, Anko가 항암제 역할을 해줬습니다.  
Anko에서는 Toast를 제외하고도 유용한 API들을 많이 제공합니다. [Anko-Dialog](https://github.com/Kotlin/anko/wiki/Anko-Commons-%E2%80%93-Dialogs)

-------------------------------

## Anko Layout

사실 이런(`toast()`) 유틸성 함수는 라이브러리를 쓰지 않고, 프로젝트 단에서 미리 구현해 사용할 수도 있습니다.  
그렇기에 Anko가 제 마음을 사로잡은 건, 그런 기능들이 아닙니다. 저는 Android에서 프로그래밍 방식으로 UI를 그리는 것에 대해 큰 **환멸감**을 느끼고 있었습니다.  

`클릭시 Toast메시지가 나오는 버튼`
```kotlin
val act = this
val layout = LinearLayout(act)
layout.orientation = LinearLayout.VERTICAL
val name = EditText(act)
val button = Button(act)
button.text = "Say Hello"
button.setOnClickListener {
  Toast.makeText(act, "Toast Message", Toast.LENGTH_SHORT).show()
}
layout.addView(name)
layout.addView(button)
```

`클릭시 Toast메시지가 나오는 버튼 (Feat.Anko)`
```kotlin
verticalLayout {
	val name = editText()
	button("Say Hello") {
		onClick { toast("Toast Message") }
	}
}
```

위의 예시코드는 극단적인 상황이긴 하지만, 실제로 프로그래밍 방식으로 UI를 그리는 것은 **정말 힘들고**, 고된 일입니다. XML은 말할 것도 없고요.  
"Anko Layout"은 저와 같은 사람에게 큰 해방감을 줍니다. 이제 UI 제작에만 집중할 수 있을 것 같습니다.

----------------------------

### UI의 컴포넌트화도 가능합니다!

개인적으로 웹 프론트엔드 영역에서 UI 라이브러리와 프레임워크([React](https://reactjs.org/), [Vue](https://vuejs.org/))를 아주 잘 사용하던 입장이였습니다.  
하지만 android에서는 UI를 **재사용**하기에(컴포넌트화 하기에) 좋은 방법이 얼마 없었습니다. 늘 그렇듯 정답을 찾았고, 정답은 여기 있었습니다.

`carousel indicator를 그려주는 함수`
```kotlin
fun ViewManager.drawIndicator(count: Int, resource: Int, margin: Int, onOpacity: Float, offOpacity: Float) = linearLayout {
	for (i in 0..count) {
		view {
			backgroundResource = resource
		}.lparams{
			width = dip(6)
			height = dip(6)
			if (i != 0) {
					alpha = offOpacity
					leftMargin = dip(margin)
			} else {
					alpha = onOpacity
			}
		}
	}
}
```

해당 함수를 사용하고자 하는 UI에서 호출해주기만 하면 Indicator가 그려집니다!



-----------------------------

### Constraint Layout 또한 가능합니다!

```kotlin
constraintLayout {
	textView {
		id = R.id.clickButtonText
		text = "click Button!"
		textAlignment = View.TEXT_ALIGNMENT_CENTER
	}.lparams{
		width = matchParent
		height = dip(30)
	}

	button("Button") {
		onClick {
			toast("Toast Message")
		}
	}.lparams{
		topToBottom = R.id.clickButtonText
	}
}
```

## 끝으로

Anko로 개발하는 것의 단점이라고 한다면, XML과는 다르게 `Preview`기능이 안된다는 것 같은데, [얼마전](https://medium.com/@yeongpal/kotlin-anko%EB%A1%9C-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-5-23584be5f67e) 까진 됐던 것 같다.. 나는 왜 안되지...  
지금은 Swift의 [Texture](https://github.com/TextureGroup/Texture)를 보고 있고, 얼마안가 이에 관해 포스팅 하지 않을까 싶다.