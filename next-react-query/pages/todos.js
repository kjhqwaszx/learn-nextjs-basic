import {Fragment, useCallback, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";

const getTodos = async () => {
  const { data } = await axios.get("http://localhost:5000/todos");
  return data;
};

const addTodo = async (todo) => {
  const { data } = await axios.post("http://localhost:5000/todos", {
    todo,
    done: false,
  });

  return data;
};

const TodosPage = () => {
  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery("todos", getTodos, {refetchOnWindowFocus: false});


  const { mutate } = useMutation(addTodo, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries("todos");
      queryClient.setQueryData("todos", (oldData) => {
        if (!oldData) {
          return [];
        }
        return [...oldData, { id: data.id, todo: data.todo, done: false }];
      });
    },
  });

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
        <input
          type="text"
          value={todo}
          onChange={(e) =>
            setTodo(e.target.value)
          }
        />
        <button type="submit">작성</button>
      </form>

      <br />

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          todos?.map((todo) => (
            <Fragment key={todo.id}>
              <div>ID: {todo.id}</div>
              <div>할 일: {todo.todo}</div>

              <br />
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  );
};
export default TodosPage;