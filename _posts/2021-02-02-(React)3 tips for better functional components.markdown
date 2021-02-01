---
layout: post
title: "[React] 더 나은 함수 컴포넌트를 위한 3가지 팁"
subtitle: "더 나은 함수 컴포넌트를 위한 3가지 팁"
categories: devlog
tags: js javascript front-end 프론트엔드 리액트 훅 훅스 tips
comments: true
header-img: "/img/posts/3_tips_for_better_functional_components/header.jpeg"
---

# 더 나은 함수 컴포넌트를 위한 3가지 팁

나는 폼이 전송되기 전에, 추가적인 발리데이션을 추가하는 업무를 배정받았습니다.

해당 폼 컴포넌트를 보니, 300줄이 넘는 컴포넌트였고, JSX 코드만 150줄이었습니다. 로직은 많은 `useState`와 많은 `useEffect` 그리고 많은 의존성들.. 이 존재했고, 이해하기 아주 어려웠습니다.

내가 쓴 코드는 나도 이해하지 못하는, 말 그대로 **코드 괴물**이 되었고, 한동안 그저 바라볼 수 밖에 없었습니다.

너무 부끄럽고, 놀랐지만, 더이상 같은 실수를 반복할 순 없습니다.

## useState대신 useReducer를 사용
서론에서, 저는 이 컴포넌트에 많은 useState가 있다고 언급했습니다.
컴포넌트에서 어느 부분이 특정 상태를 업데이트 하는지 알기 위해 모든 useState를 찾아야 했기 때문에 읽기 상당히 어려웠습니다.

```javascript
	const [questionState, setQuestionState] = useState([])
  const [formState, setFormState] = useState([])
  const [
    currentTicketForm,
    setCurrentTicketForm
  ] = useState(null)
  const [success, setSuccess] = useState(false)
  const [ticketName, setTicketName] = useState('')
  const [ticketSubcategoryName, setTicketSubcategoryName] = useState('')
  ...

```

누가봐도, 이 코드는 보기힘듭니다. 리팩토링을 해야합니다. 이 폼을 제어하기 위해 `useReducer`를 사용할 수 있을 것 같군요.


```javascript
export const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TICKER_FORM':
      return {
        ...state,
        ticketForm: action.payload,
        ticketAnswers: action.payload.answers,
        ticketQuestions: action.payload.questions,
        ticketFields: action.payload.newTickets,
        currentField: action.payload.newTickets[0]
      }
    case 'CHANGE_VALUE':
      return {
        ...state,
        temporaryValue: action.payload.temporaryValue
      }
    case 'GO_NEXT_QUESTION':
      return {
        ...state,
        ticketAnswers: {
          ...state.ticketAnswers,
          [state.currentField]: state.temporaryValue
        },
        currentField: state.ticketFields[
          state.ticketFields?.indexOf(state.currentField) + 1
        ],
        questionHistory: [
          ...state.questionHistory,
          state.currentField.id
        ],
      }
    ...
  }
}

```

자, 이제 어떤 동작이 어떤 상태에 영향을 미치는지 쉽게 알 수 있겠군요! 이렇게 하면 상태를 더 많이 제어할 수 있으며 새 기능을 구현하는 것이 더 쉽습니다.

## 로직 나누기

이 폼에선, 데이터를 받아와 상태를 업데이트해줘야 합니다. 이 때 저는 `fetch API`를 사용하려고 했습니다.

데이터를 받아와 컴포넌트의 상태를 업데이트해줘야 하는 비슷한 컴포넌트가 있을 시에, 커스텀 훅을 작성할 수 있습니다.

```javascript
export const useFetch = (url) => {
  const [listState, setListState] = React.useState([])

  useEffect(() => {
    const abortFetch = Fetch.get(url, {
      onCompleted: data => {
        setListState(data)
      }
    })

    return abortFetch
  }, [])

  return { listState }
}
```

추가적인 쿼리가 필요한다던가, 예외가 있다면, 로직을 해당 훅에 작성할 수도 있습니다.


## 작은 조각으로 분할하기

내가 작성한, 코드 괴물에는 100줄이 넘는 UI 코드가 있습니다.
코드에는 div들 그리고 그 다음에 div들이 있었으며, 코드가 어떤 UI를 그리는지 정확히 2분 뒤에 알 수 있었습니다.
이 div 유니버스에서는 조건부 렌더링도 있었으며 저는 코드를 읽기위해 스크롤을 아래로 내려야했습니다.


```javascript
<div>
  <div>
    {currentForm ? (
      <div>
        <span>Question</span>
        <h3>
          {currentForm.name}
        </h3>
        <div className="mt-8">
          <OptionComponent
            value={currentForm.value}
            type={currentForm.type}
            options={currentForm.options}
          />
        </div>
        <div>
          <Button>
            Back
          </Button>
          <Button>
            Save
          </Button>
        </div>
      </div>
    ) : null}
  </div>
</div>
```

보시면, `currentForm `은 큰 JSX를 감싸고 있습니다. 가독성을 위해 다른 컴포넌트로 옮기는 게 좋을 것 같습니다.

```javascript
<div>
  <div>
    {currentForm ? (
      <Form
        value={temporaryValue}
        type={currentForm.type}
        options={currentForm.options?.split('\n') || []}
      />
    ) : null}
  </div>
</div>
```


## 마치면서
코드를 작성하는 완벽한 방법은 없습니다. 팀마다 모두 다른 패턴을 따르지만, 코드를 보았을 때 어떤 느낌이 든다면, 리팩토링을 해야합니다.

- 많은 `useState`를 사용하고 있다면, `useReducer`로 변경하는 걸 고려해봅시다. 더 나은 유지보수와 향후 기능 추가에 도움이 될 것입니다.
- 재사용할 수 있는 로직들은 나눕시다. 이것은 `데이터 가져오기`와 같이 다른 컴포넌트에서 사용할 수 있는 유틸리티 함수가 될 수 있습니다.
- 컴포넌트를 분할합시다. 코드의 가독성을 위해서도 도움이 되고, 성능에도 도움이 됩니다. 되도록 100줄을 넘지 마세요.