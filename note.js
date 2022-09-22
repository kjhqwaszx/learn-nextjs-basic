// React Basic

/**
 * [ React Hooks ]
 *
 * 1. Intro
 * React 16.8버전에 추가된 공식 라이브러리이다.
 * Hook을 통해 Class형 컴포넌트에서만 쓸 수 있었던 state와 lifecycle을 함수형 컴포넌트에서도 사용이 가능해졌다.
 *
 * 2. Why Hooks
 * 함수형 컴포넌트들은 리랜더링 될때, 함수 안에 작성된 모든 코드가 다시 실행되어 새롭게 선언 & 초기화 & 메모리 할당이
 * 이루어져 기존 state값이 변경된다. 이 때문에 함수형 컴포넌트를 Stateless Component라고 한다.
 *  -> 클래스형 컴포넌트는 리랜더링이 되더라도 render() 부분만 실행되기 때문에 method 및 state들은 유지가 된다.
 * 이러한 문제를 해결하기위해 Hook이 등장했다. 다만, 브라우저의 메모리 자원을 사용하기 때문에 hook을 남발하면 성능 저하가 발생할 수 있다.
 *   --> 경렬님께서 고민하셨던 useMemo, useCallback으로 모든 컴포넌트와 함수를 선언하면 안될까? 라는 질문에 대한 해답인듯하다.
 *   --> 성능 최적화를 위해서는 남용하는 것보다 화면의 성격(사용성, 리랜더링, 실시간 데이터 처리 등)을 고려해서 적용하면 좋을 것같다.
 *
 *
 * 3. Hook사용 규칙 ( 강제성은 아님 )
 *  ( eslint-plugin-react-hooks를 사용해 최적화 가능 )
 * - 최상위 컴포넌트에서만 Hook을 호출
 * - 반복문 / 조건문 / 중첩된 함수에서 호출 x
 * - Hook naming 규칙은 앞에 use를 붙이는 것이다.
 *
 * 4. 기본 제공 Hook
 *  - useState: 동적 상태관리
 *   ex) const [value, setValue] = useState(initData)
 *  - useEffect: Component의 mount / unmount / update를 기점으로 trigger
 *  - useContext: 컴포넌트를 중첩하지 않고 전역 값을 관리
 *  - useReducer: 복잡한 컴포넌트들의 state를 관리 및 분리
 *  - useCallback: useCallback으로 선언한 함수는 메모리에 다시 할당되더라도 의존 변수가 바뀌지 않으면 기존의 함수 사용(메모리에 함수 재할당x)
 *    -> 이 부분은 React.memo와 연관이 있고, 경렬님이 말씀해주신 클로저의 단점을 보완할 수 있는 요소이다.
 *      < react-todo-app 내용 확인 >
     *  const handleClick = useCallback((id) => {
     *   let newTodoData = todoData.filter((data) => data.id !== id);
     *   setTodoData(newTodoData);
     * }, todoData); // todoData를 의존 변수로 설정
 *
 *  - useMemo: 선언한 함수를 다시 호출하지 않고 캐싱된 데이터를 return. defs 값이 변경되면 함수 호출
     *  // compute 함수가 비용이 많이 든다고 가정.
     * const Component = ({ a, b }) => {
     *   const result = compute(a, b);
     *   return <div>{result} </div>;
     * };
     *
     * // a,b 가 동일 할 경우 캐시된 데이터를 반환한다.
     * const Component = ({ a, b }) => {
     *   const result = useMemo(() => compute(a, b), [a, b]); // [a,b] 의존성 변수
     *   return <div>{result}</div>;
     * };
 **/

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
 * [ React.memo ]
 *  컴포넌트의 경우 state 값이 변경되면 컴포넌트들이 다시 랜더링 된다.
 * 예를 들어 form 컴포넌트에서 타이핑을 하게되면 state 값이 변경되어 app.js 와 lists.js 컴포넌트들이 랜더링된다.
 * 하지만 lists 컴포넌트는 변경되는 state 값인 value를 사용하지 않기 때문에 랜더링 되지 않아도 된다.
 * 이때, React.memo를 사용하게 되면 컴포넌트의 props가 바뀌지 않는 한 랜더링 되는것을 방지한다.
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
 * 부모인 App.js가 랜더링 되면서 사용자 정의 함수인 handleClick가 새로 만들어 지면서
 * Lists.js 컴포넌트 입장에서는 변화가 되었다고 감지하고 랜더링 된다.
 * 이때, useCallback을 사용해 의존 변수가 변하지 않으면 handleClick는 변화된 것이 아니라고 알린다.
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
