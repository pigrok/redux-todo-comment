import uuid from "react-uuid";
import shortid from "shortid";

const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const SWITCH_TODO = "todos/SWITCH_TODO";

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

export const switchTodo = (payload) => {
  return {
    type: SWITCH_TODO,
    payload,
  };
};

const initialState = [
  {
    id: shortid.generate(),
    title: "리엑트",
    body: "리엑트 만들기",
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "운동",
    body: "헬스장에서 근력 운동",
    isDone: true,
  },
  {
    id: uuid(),
    title: "알고리즘",
    body: "프로그래머스 문제 풀기",
    isDone: false,
  },
];

//리듀서
// action -> type과 payload
const todos = (state = initialState, action) => {
  // 액션을 지정
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case SWITCH_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });

      break;

    default:
      return state;
  }
};

export default todos;
