---
layout: post
title: "[React] 리액트 훅이 실패한 설계인 이유 네가지"
subtitle: "리액트 훅이 실패한 설계인 이유 네가지"
categories: devlog
tags: js javascript front-end 프론트엔드 리액트 React hooks React-hooks 훅 훅스
comments: true
header-img: "/img/posts/3_tips_for_better_functional_components/header.jpeg"
---

<h1 id="더 나은 함수 컴포넌트를 위한 3가지 팁">더 나은 함수 컴포넌트를 위한 3가지 팁</h1>
<br>
<p>나는 폼이 전송되기 전에, 추가적인 발리데이션을 추가하는 업무를 배정받았습니다.</p>
<br>
<p>해당 폼 컴포넌트를 보니, 300줄이 넘는 컴포넌트였고, JSX 코드만 150줄이었습니다. 로직은 많은 <code class='code-inline'>useState</code>와 많은 <code class='code-inline'>useEffect</code> 그리고 많은 의존성들.. 이 존재했고, 이해하기 아주 어려웠습니다.</p>
<br>
<p>내가 쓴 코드는 나도 이해하지 못하는, 말 그대로 <b>코드 괴물</b>이 되었고, 한동안 그저 바라볼 수 밖에 없었습니다.</p>
<br>
<p>너무 부끄럽고, 놀랐지만, 더이상 같은 실수를 반복할 순 없습니다.</p>
<br>
<h2 id="useState대신 useReducer를 사용">useState대신 useReducer를 사용</h2>
<p>서론에서, 저는 이 컴포넌트에 많은 useState가 있다고 언급했습니다.</p>
<p>컴포넌트에서 어느 부분이 특정 상태를 업데이트 하는지 알기 위해 모든 useState를 찾아야 했기 때문에 읽기 상당히 어려웠습니다.</p>
<br>
<pre><code lang='javascript'>	const [questionState, setQuestionState] = useState([])
  const [formState, setFormState] = useState([])
  const [
    currentTicketForm,
    setCurrentTicketForm
  ] = useState(null)
  const [success, setSuccess] = useState(false)
  const [ticketName, setTicketName] = useState('')
  const [ticketSubcategoryName, setTicketSubcategoryName] = useState('')
  ...
</code></pre>
<p><br/></p>
<p>누가봐도, 이 코드는 보기힘듭니다. 리팩토링을 해야합니다. 이 폼을 제어하기 위해 <code class='code-inline'>useReducer</code>를 사용할 수 있을 것 같군요.</p>
<br>
<br>
<pre><code lang='javascript'>export const formReducer = (state, action) =&gt; {
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
</code></pre>
<p><br/></p>
<p>자, 이제 어떤 동작이 어떤 상태에 영향을 미치는지 쉽게 알 수 있겠군요! 이렇게 하면 상태를 더 많이 제어할 수 있으며 새 기능을 구현하는 것이 더 쉽습니다.</p>
<br>
<h2 id="로직 나누기">로직 나누기</h2>
<br>
<p>이 폼에선, 데이터를 받아와 상태를 업데이트해줘야 합니다. 이 때 저는 <code class='code-inline'>fetch API</code>를 사용하려고 했습니다.</p>
<br>
<p>데이터를 받아와 컴포넌트의 상태를 업데이트해줘야 하는 비슷한 컴포넌트가 있을 시에, 커스텀 훅을 작성할 수 있습니다.</p>
<br>
<pre><code lang='javascript'>export const useFetch = (url) =&gt; {
  const [listState, setListState] = React.useState([])

  useEffect(() =&gt; {
    const abortFetch = Fetch.get(url, {
      onCompleted: data =&gt; {
        setListState(data)
      }
    })

    return abortFetch
  }, [])

  return { listState }
}</code></pre>
<p><br/></p>
<p>추가적인 쿼리가 필요한다던가, 예외가 있다면, 로직을 해당 훅에 작성할 수도 있습니다.</p>
<br>
<br>
<h2 id="작은 조각으로 분할하기">작은 조각으로 분할하기</h2>
<br>
<p>내가 작성한, 코드 괴물에는 100줄이 넘는 UI 코드가 있습니다.</p>
<p>코드에는 div들 그리고 그 다음에 div들이 있었으며, 코드가 어떤 UI를 그리는지 정확히 2분 뒤에 알 수 있었습니다.</p>
<p>이 div 유니버스에서는 조건부 렌더링도 있었으며 저는 코드를 읽기위해 스크롤을 아래로 내려야했습니다.</p>
<br>
<br>
<pre><code lang='javascript'>&lt;div&gt;
  &lt;div&gt;
    {currentForm ? (
      &lt;div&gt;
        &lt;span&gt;Question&lt;/span&gt;
        &lt;h3&gt;
          {currentForm.name}
        &lt;/h3&gt;
        &lt;div className="mt-8"&gt;
          &lt;OptionComponent
            value={currentForm.value}
            type={currentForm.type}
            options={currentForm.options}
          /&gt;
        &lt;/div&gt;
        &lt;div&gt;
          &lt;Button&gt;
            Back
          &lt;/Button&gt;
          &lt;Button&gt;
            Save
          &lt;/Button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    ) : null}
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><br/></p>
<p>보시면, <code class='code-inline'>currentForm </code>은 큰 JSX를 감싸고 있습니다. 가독성을 위해 다른 컴포넌트로 옮기는 게 좋을 것 같습니다.</p>
<br>
<pre><code lang='javascript'>&lt;div&gt;
  &lt;div&gt;
    {currentForm ? (
      &lt;Form
        value={temporaryValue}
        type={currentForm.type}
        options={currentForm.options?.split('\n') || []}
      /&gt;
    ) : null}
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><br/></p>
<br>
<h2 id="마치면서">마치면서</h2>
<p>코드를 작성하는 완벽한 방법은 없습니다. 팀마다 모두 다른 패턴을 따르지만, 코드를 보았을 때 어떤 느낌이 든다면, 리팩토링을 해야합니다.</p>
<br>
<ul><li>많은 <code class='code-inline'>useState</code>를 사용하고 있다면, <code class='code-inline'>useReducer</code>로 변경하는 걸 고려해봅시다. 더 나은 유지보수와 향후 기능 추가에 도움이 될 것입니다.
</li><li>재사용할 수 있는 로직들은 나눕시다. 이것은 <code class='code-inline'>데이터 가져오기</code>와 같이 다른 컴포넌트에서 사용할 수 있는 유틸리티 함수가 될 수 있습니다.
</li><li>컴포넌트를 분할합시다. 코드의 가독성을 위해서도 도움이 되고, 성능에도 도움이 됩니다. 되도록 100줄을 넘지 마세요.</li></ul>
