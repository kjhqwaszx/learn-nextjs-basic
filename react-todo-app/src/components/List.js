import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

// 구조분해 할당으로 props 값을 바로 받아온다.
export default function List({todoData, setTodoData}) {

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

  // 드레그를 놓았을때의 위치 값으로 todoData배열 재설정
  const handleEnd = (result)=>{
    //result에는 destination, source값이 들어있다.
    if(!result.destination) return;

    const newTodoData = todoData;

    //1. 이동하는 데이터를 잘라내기    
    // [] 배열로 한번 감싸주는 이유는 객체 타입으로 만들어주기 위해서. ( 배열로 감싸지 않을 경우 arr형태이므로 insert 시 문제 발생)
    const [reOrderedItem] = newTodoData.splice(result.source.index, 1)

    //2. 이동하는 index에 insert
    newTodoData.splice(result.destination.index,0,reOrderedItem)
    setTodoData(newTodoData)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId='todo'>
          {(provided)=>(
            // Droppable 에서 주는 정보를 div 태그에 전달
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map( (data,index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided,snapshot)=>(
                    // Draggable 데이터 전달
                    <div key={data.id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className={`${snapshot.isDragging ? "bg-gray-400": "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
                      <div className='items-center'>
                        <input 
                          type="checkbox" 
                          className='mr-2'
                          defaultChecked={false}
                          onChange= {() =>handleCompletedChange(data.id)} 
                        />
                        <span className= {data.completed ? "line-through" : undefined}>{data.title}</span>
                      </div>
                      <div className='items-center'>
                        <button className='px-4 py-2 float-right' onClick={ () => handleClick(data.id) }>x</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
