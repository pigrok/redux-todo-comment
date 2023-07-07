import { createStore } from "redux";
import { combineReducers } from "redux";
import todos from "../modules/todos";
import reviews from "../modules/review";

// store 만들기
// 중앙 데이터 관리소
const rootReducer = combineReducers({
  todos,
  reviews: reviews,
});
const store = createStore(rootReducer);

export default store;
