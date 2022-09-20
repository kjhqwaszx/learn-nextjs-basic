import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState('');

  const btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 5px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right',
  };

  const getStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none',
    };
  };

  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    //page reload 방지
    event.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo]);
    setValue('');
  };

  const handleCompletedChange = (id) => {
    let newTodoData = todoData.map((data) => {
      console.log(data.id);
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    setTodoData(newTodoData);
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1> 할 일 목록</h1>
        </div>

        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => handleCompletedChange(data.id)}
            />
            {data.title}
            <button style={btnStyle} onClick={() => handleClick(data.id)}>
              x
            </button>
          </div>
        ))}

        <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: '10', padding: '5px' }}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <input type="submit" value="입력" className="btn" style={{ flex: '1' }} />
        </form>
      </div>
    </div>
  );
}
