import React, {useState} from 'react'
import './App.css'
import Form from './components/Form'
import List from './components/List'

export default function App(){
  const [todoData,setTodoData] = useState([])
  const [value, setValue] = useState("")
  
    const handleSubmit = (event) =>{
    //page reload 방지
    event.preventDefault();
    
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    }
    //setter 호출 시 파라미터를 추가하면 oldValue
    setTodoData(prev => [...prev, newTodo])
    setValue("")
  }

  return(
    <div className='container'>
      <div className='todoBlock'>
        <div className = 'title' >
          <h1> 할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} ></List>
        <Form value={value} setValue={setValue} handleSubmit={handleSubmit}></Form>
        
      </div>
    </div>
  )
}