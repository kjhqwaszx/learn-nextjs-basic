import React, { useState, useCallback } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';

const initialTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState('');

  /*
  * useCallback 사용
  *
  * const handleClick = useCallback( (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    }, todoData);
  * */

  const handleSubmit = (event) => {
    //page reload 방지
    event.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    //setter 호출 시 파라미터를 추가하면 oldValue
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
  };
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100  ">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1> 할 일 목록</h1>
          <button onClick={handleRemoveClick}> Delete All </button>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData}></Lists>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}></Form>
      </div>
    </div>
  );
}
