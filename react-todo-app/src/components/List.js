import React from 'react'

// 구조분해 할당으로 props 값을 바로 받아온다.
export default function List({todoData, setTodoData}) {
  const btnStyle ={
    color: "#fff",
    border: "none",
    padding: "5px 5px",
    borderRadius: "50%",
    cursor:  "pointer",
    float:"right"
  }

  const getStyle = (completed) =>{
    return{
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }

  const handleClick = (id) => {
    let newTodoData =  todoData.filter( data => data.id !== id)
    setTodoData(newTodoData)
  }

  const handleCompletedChange = (id) =>{
    let newTodoData = todoData.map( data => {
      if(data.id === id){
        data.completed = !data.completed
      }
      return data
    })

    setTodoData(newTodoData)
  }

  return (
    <div>
      {todoData.map( data => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input 
              type="checkbox" 
              defaultChecked={false}
              onChange= {() =>handleCompletedChange(data.id)} 
            />
              {data.title}
            <button style={btnStyle} onClick={ () => handleClick(data.id) }>x</button>
          </div>
        ))}
    </div>
    
  )
}
