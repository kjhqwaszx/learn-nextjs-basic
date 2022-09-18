// React Basic


/*
  [ state 관리 ]
    - const [변수명, set변수 ] = useState(value) 형태로 선언해 사용한다.
    - setter부분에서 화살표 함수로 파라미터를 전달하면 oldValue가 전달된다.

    
*/


import React, {useState} from 'react'
const [todoData, setTodoData] = useState([]);

setTodoData(prev => [...prev, newTodo])

/**
 * [ 구조분해할당 ]
 *   - 객체 및 배열을 구조분해하여 할당하는 것.
 *   - 소스가 간결해진다.
 * 
 */

// 1.
const studentDetail1 = {
  firstName: 'John',
  lastName: 'Mary'
}

const {firstName, lastName} = studentDetail;

// 2.
const studentDetail2 = {
  firstName: 'John',
  lastName: 'Mary'
}

// fisrtName 값을 fName변수로 사용할 것이고, 값이 넘어오지 않으면 not given 사용
const {firstName: fName ='not given', lastName: lName = 'not given'} = studentDetail;
