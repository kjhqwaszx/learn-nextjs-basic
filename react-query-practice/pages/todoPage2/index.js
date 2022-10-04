import React, { Fragment, useCallback, useState} from 'react';
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";

const getTodos = async () =>{
  const {data} = await axios.get("http://localhost:5000/todos")
  return data
}
const addTodo = async (todo) =>{
  const {data} = await axios.post("http://localhost:5000/todos",{
    todo,
    done: false
  })
  return data
}

const Index = () => {
  const [todo, setTodo] = useState("")
  const queryClient = useQueryClient()

  const {data:todos, isLoading, isError, error} = useQuery("todos", getTodos,{
    refetchOnWindowFocus: false
  })

  // useMutation은 첫번째 인자로 query function을 받는다
  // useMutation의 반환값 중 mutate는 query function을 실행시키는 역할을 한다.
  const {mutate} = useMutation(addTodo, {
    onSuccess: (data) => {
      // addTodo가 성공적으로 실행됐을 경우 호출된다.
      // query key가 todos인 데이터를 업데이트한다. oldData는 기존의 todos 데이터 들이고 data는 mutate이후 응답받은 데이터이다.
      queryClient.setQueryData("todos", (oldData)=> {
        if(!oldData) return []

        return [...oldData, {id:data.id, todo:data.todo, done:false }]
      })
    }
  })

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutate(todo);
      setTodo("");
    },
    [mutate, todo]
  );

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>할 일: </label>
        <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button type="submit">작성</button>
      </form>

      <br/>

      <div>
        {isLoading? (
          <div>Loading...</div>
        ) : (
          todos?.map((todo) => (
            <Fragment key={todo.id}>
              <div>ID: {todo.id}</div>
              <div>할 일: {todo.todo}</div>
              <br/>
              <hr/>
            </Fragment>
          ))
        )}
      </div>
    </>
  );
};

export default Index;