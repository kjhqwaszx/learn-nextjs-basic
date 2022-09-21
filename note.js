// React Basic

/**
  [ state 관리 ]
    - const [변수명, set변수 ] = useState(value) 형태로 선언해 사용한다.
    - setter부분에서 화살표 함수로 파라미터를 전달하면 oldValue가 전달된다.
*/

import React, { useState } from "react";
import List from "./react-todo-app/src/components/List";
const [todoData, setTodoData] = useState([]);

setTodoData((prev) => [...prev, newTodo]);

/**
 * [ 구조분해할당 ]
 *   - 객체 및 배열을 구조분해하여 할당하는 것.
 *   - 소스가 간결해진다.
 *
 */

// 1.
const studentDetail1 = {
  firstName: "John",
  lastName: "Mary",
};

const { firstName, lastName } = studentDetail;

// 2.
const studentDetail2 = {
  firstName: "John",
  lastName: "Mary",
};

// fisrtName 값을 fName변수로 사용할 것이고, 값이 넘어오지 않으면 not given 사용
const { firstName: fName = "not given", lastName: lName = "not given" } =
  studentDetail;

/**
 * [ Route.memo ]
 *  컴포넌트의 경우 state 값이 변경되면 컴포넌트들이 다시 랜더링 된다.
 * 예를 들어 form 컴포넌트에서 타이핑을 하게되면 state 값이 변경되어 app.js 와 lists.js 컴포넌트들이 랜더링된다.
 * 하지만 lists 컴포넌트는 변경되는 state 값인 value를 사용하지 않기 때문에 랜더링 되지 않아도 된다.
 * 이때, Route.memo를 사용하게 되면 컴포넌트의 props가 바뀌지 않는 한 랜더링 되는것을 방지한다.
 *
 */

//props 인 todoData와 setTodoData가 변경되면 랜더링 된다.
const Lists = React.memo(({ todoData, setTodoData, testMethods }) => {
  // ...

  return (
    // 드레그를 놓았을때의 위치 값으로 todoData배열 재설정
    <div>...</div>
  );
});

/**
 * [ useCallback ]
 * 위의 예시를 보았을때, React.memo를 통해 다시 랜더링되는 것을 방지했지만
 * 부모인 App.js가 랜더링 되면서 사용자 정의 함수인 testMethods가 새로 만들어 지면서
 * Lists.js 컴포넌트 입장에서는 변화가 되었다고 감지하고 랜더링 된다.
 * 이때, useCallback 을 사용해 의존 변수가 변하지 않으면 testMethods는 변화된 것이 아니라고 알린다.
 *
 */
const handleClick = useCallback((id) => {
  let newTodoData = todoData.filter((data) => data.id !== id);
  setTodoData(newTodoData);
}, todoData); // todoData를 의존 변수로 설정

/**
 * [ useMemo ] _ Memoization
 * 메모이제이션은 비용이 많이 드는 함수 호출의 결과를 저장하고 동일한 파라미터가 들어왔을 때, 캐시된 결과를 반환하는 것이다.
 * 화면이 자주 랜더링 되거나, 자주 사용되는 함수는 useMemo를 적용하면 성능이 향상될 가능성이 있다.
 * */

// compute 함수가 비용이 많이 든다고 가정.
const Component = ({ a, b }) => {
  const result = compute(a, b);
  return <div>{result} </div>;
};

// a,b 가 동일 할 경우 캐시된 데이터를 반환한다.
const Component = ({ a, b }) => {
  const result = useMemo(() => compute(a, b), [a, b]); // [a,b] 의존성 배열
  return <div>{result}</div>;
};
