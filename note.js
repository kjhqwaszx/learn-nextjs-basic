// React Basic


/*
  [ state 관리 ]
    - const [변수명, set변수 ] = useState(value) 형태로 선언해 사용한다.
    - setter부분에서 화살표 함수로 파라미터를 전달하면 oldValue가 전달된다.

    
*/


import React, {useState} from 'react'
const [todoData, setTodoData] = useState([]);

setTodoData(prev => [...prev, newTodo])