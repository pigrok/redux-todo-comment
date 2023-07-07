import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodo, switchTodo } from "../../redux/modules/todos";

function List({ isDone }) {
  const todos = useSelector((state) => {
    return state.todos;
  });

  const dispatch = useDispatch();

  const DeleteHandler = (todo) => {
    dispatch(deleteTodo(todo));
  };

  const SwitcHandler = (todo) => {
    dispatch(switchTodo(todo));
  };

  return (
    <div>
      <div>
        <h1>{!isDone ? "TODOLIST" : "DONELIST"} </h1>
        <div>
          {todos
            .filter((todo) => todo.isDone === isDone)
            .map((todo) => {
              return (
                <div
                  key={todo.id}
                  style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <Link to={`/${todo.id}`}>Detail</Link>
                  <p>{todo.id}</p>
                  <p>{todo.title}</p>
                  <p>{todo.body}</p>
                  <p>{todo.isDone.toString()}</p>
                  <button
                    onClick={() => {
                      SwitcHandler(todo.id);
                    }}
                  >
                    {todo.isDone ? "cancel" : "complete"}
                  </button>
                  <button
                    onClick={() => {
                      DeleteHandler(todo.id);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default List;
