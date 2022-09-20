import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({ todoData, setTodoData }) => {
  const handleEnd = (result) => {
    if (!result.destination) return;

    const newTodoData = todoData;

    //1. 이동하는 데이터를 잘라내기
    // [] 배열로 한번 감싸주는 이유는 객체 타입으로 만들어주기 위해서. ( 배열로 감싸지 않을 경우 arr형태이므로 insert 시 문제 발생)
    const [reOrderedItem] = newTodoData.splice(result.source.index, 1);

    //2. 이동하는 index에 insert
    newTodoData.splice(result.destination.index, 0, reOrderedItem);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  return (
    // 드레그를 놓았을때의 위치 값으로 todoData배열 재설정
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            // Droppable 에서 주는 정보를 div 태그에 전달
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    // Draggable 데이터 전달
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    ></List>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
