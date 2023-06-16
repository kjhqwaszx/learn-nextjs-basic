// React Basic

/**
 * [ React Hooks ]
 *
 * 1. Intro
 * React 16.8버전에 추가된 공식 라이브러리이다.
 * Hook을 통해 Class형 컴포넌트에서만 쓸 수 있었던 state와 lifecycle을 함수형 컴포넌트에서도 사용이 가능해졌다.
 *
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
 *  - useRef: 특정 DOM을 선택할 때 사용하는 훅
 *   -> 엘리먼트의 크기를 가져와야 할 때 / 스크롤바 위치를 가져와야할 때 / 특정 input태그에 포커스를 설정해 줘야 할 때 주로 사용
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
import {getAllPostIds, getPostData} from "./nextjs-blog/lib/posts";
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

/**
 * [ React-Router-Dom ]
 *
 *  1. BrowserRouter
 *  HTML5 History API(pushState, replaceStae 및 popstate 이벤트)를 사용하여 UI를 url과 동기화된 상태로 유지해준다.
 *   -> SPA에서는 하나의 index.html을 사용하므로 동기화 필요
 *
 *  2. Routes
 *  앱에서 생성될 모든 개별 경로에 대한 컨테이너/상위 역할을 한다.
 *  Route로 생성된 자식 컴포넌트 중에서 매칭되는 첫뻔째 Route를 렌더링해준다.
 *
 *  3.Route
 *  단일 경로를 만드는데 사용하고 두 가지 속성을 취합한다.
 *   - path: 원하는 컴포넌트의 url 경로를 지정한다.
 *   - element: 경로에 맞는 컴포넌트
 *
 *  4. Router Dom APIS
 *    - Nested Router ( 중첩 라우터 ): Vue의 children 느낌
 *    - Outlet: 부모경로 요소에서 자식 경로 요소를 랜더링 하려면 <Outlet/>태그를 사용해야 한다. (router-view 느낌)
 *    - useNavigate
 *    - useParams
 *    - useLocation
 *    - useRoutes
 *
 */

//HTML5 History API(pushState, replaceState 및 popstate 이벤트)를 사용하여 UI를 URL과 동기화된 상태로 유지해준다.

/**
 * Next.js
 * [ PreRendering ]
 *  * 테스트를 할 때에는 build 한 후 start해야 한다.
 *
 * 1. SSG ( Server Side Generate )
 *   - getStaticPath( 동적 페이지를 생성할 수 있으며 getStaticProps 와 함께 사용해야 한다.
 *   - getStaticProps
 *   - 빌드를 하는 시점에서 API를 한번 호출한다. ( .next > server > 파일명.json 파일에 데이터까지 빌드 )
 *   - 자주 바뀌지 않는 데이터의 경우에는 저장해 두는게 빠르다. ( 빌드 시점의 데이터 )
 *   - pages 폴더 내 컴포넌트에서만 사용이 가능하다.
 */
export const getStaticProps = async () =>{
  // console.log를 찍게되면 화면이 아닌 서버에 찍힌다.
  return{
    props:{
      users: {time: new Date().toISOString()}
    }
  }
}
// -> 홈에서는 time을 props로 받아 사용하면 된다.

/**
 * 2. SSR ( Server Side Rendering )
 *  -> getServerSideProps
 *  - 화면에 들어갈 때 마다 서버단에서 api를 호출하고 데이터를 받아와 화면에 노출시킨다. ( 실시간 데이터 )
 *  - 서버에서 API를 호출해 화면을 그려주기 때문에 client에서 js conn을 끊어도 데이터가 나옴.
 */
export const getServerSideProps = async () =>{
  // console.log를 찍게되면 화면이 아닌 서버에 찍힌다.
  return{
    props:{
      users: {time: new Date().toISOString()}
    }
  }
}

/**
 * 3. ISR (Incremental Static Regeneration)
 *  - getStaticProps with revalidate
 *  - 증분 정적 사이트를 재생성한다. ( 특정 주기로 데이터를 가져와 SSG 동작 )
 *  - SSR은 서버의 부하를 높이는 방식이다.( 사용량이 아주 많을 경우 ) 이를 위해 ISR을 사용하면 좋다.
 */
export const getStaticProps = async () =>{
  // console.log를 찍게되면 화면이 아닌 서버에 찍힌다.
  return{
    props:{
      users: {time: new Date().toISOString()},
      revalidate:1
    }
  }
}
/**
 * [Routing]
 * - 페이지를 이동할 때 사용한다.
 *
 * 1. useRouter
 *  - next/router에서 제공하는 api이다.
 *
 * 2. Link
 *  - preFetching하는 도중에 Link태그가 존재하면 목적지 페이지도 preFetching 시켜놓는다.
 *    이후 페이지 이동시 필요한 데이터만 CodeSplitting 하여 로딩하기 때문에 빠르다.
 *     -> Production 모드에서 확인 가능
 *  - a태그와는 다른점은 Link는 Client Side Navigate를 한다는 점이다.
 *    => 페이지를 다시 띄우는게 아니라 동일한 화면에서 컴포넌트 이동을 하는 것이다. ( 깜빡임 없음 )
 */

//Router
const router = useRouter();
const {quey1, query2 ... query3} = router.query // 쿼리스트링 값에서 key값을 뽑아올 수 있다.
return(<button onClick={()=>router.push('/')}> Go Home! </button>) // router.push()를 통해 이동할 수 있다.

    // Link
    <Link href="/"><a>Go Home!!</a></Link

/**
 * [기타 태그]
 *
 * 1. Image
 *   - Resizing: 자동으로 이미지 크기를 조절해 준다.
 *   - Lazy Load: viewport에 이미지가 들어올 떄 로드한다.
 *     -> 이미지가 화면 하단에 있을경우 스크롤링 해서 이미지를 보여줘야 할 시점에 로드
 *   - Optimization(최적화): 파일 포맷을 Webp로 바꾸어 파일 용량을 줄인다.
 *
 * 2. Head
 *   - title, image, description, third party script(GA) 등을 컴포넌트에서 간편하게 선언할 수 있다
 *   - OG태그(Open Graph _ 공유하기 시 나오는 화면)
 *   -
 */

/**
 * [ Dynamic Routes ]
 *  - getStaticPaths 와 getStaticProps를 통해 동적으로 페이지를 미리 그려놓는다. ( SSG )
 *  - getStaticPaths는 paths와 fallback 을 return 해주어야 한다.
 *    -> paths: 만들어 놓을 화면
 *    -> fallback:
 *         1.fase: 파일이 없을경우 404
 *         2.true: 빌드 시점에는 페이지가 없었다가 요청이 들어온 후에 페이지가 있을경우 페이지를 만들어 제공한다.
 *                 router.isFallback 을 통해 그려질동안 보여질 화면을 설정할 수 있다.
 *         3.'blocking': true와 같이 없는 페이지의 경우 요청 시점에 다시 그려준다.
 *                       true와 다른점은 이전의 화면 상태에서 화면이 그려지면 보여준다. (그려질 동안 보여질 화면이 없다.)
 *
 *
 *
 */

export async function getStaticPaths() {

  const  paths =
      [
        {
          params: { id: 'ssg-ssr' }
        },
        {
          params: {id: 'pre-rendering'}
        }
      ]

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  console.log(params);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/**
 * [기타 태그]
 *
 * 1. Image
 *   - Resizing: 자동으로 이미지 크기를 조절해 준다.
 *   - Lazy Load: viewport에 이미지가 들어올 떄 로드한다.
 *     -> 이미지가 화면 하단에 있을경우 스크롤링 해서 이미지를 보여줘야 할 시점에 로드
 *   - Optimization(최적화): 파일 포맷을 Webp로 바꾸어 파일 용량을 줄인다.
 *
 * 2. Head
 *   - title, image, description, third party script(GA) 등을 컴포넌트에서 간편하게 선언할 수 있다
 *   - OG태그(Open Graph _ 공유하기 시 나오는 화면)
 *   -
 *
 */


/**
 * [Bot에게 보여질 부분]
 * SEO 및 공유시 보여줄 화면 등등이 해당된다.
 * 이를 위해 robots.txt와 sitemap 설정을 해주어야 한다.
 *
 */

/**
 * [ 에디터 ]
 *  - draft.js 기반 react-draft-wysiwyg ( 위즈윅 ) 사용
 */