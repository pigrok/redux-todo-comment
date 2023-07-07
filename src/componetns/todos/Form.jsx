import React, { useState } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";

import { addTodo } from "../../redux/modules/todos";
import useInput from "../../api/useInput";

function Form() {
  const [title, onChangeTitleHandler] = useInput();
  const [body, onChangeBodyeHandler] = useInput();

  const dispatch = useDispatch();

  const onSubmitAddHandler = (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert("필수값이 누락되었습니다. 확인해주세요");
      return false;
    }

    dispatch(
      addTodo({
        id: shortid.generate(),
        title: title,
        body: body,
        isDone: false,
      })
    );
    onChangeTitleHandler({ target: { value: " " } });
    onChangeBodyeHandler({ target: { value: " " } });
  };

  return (
    <form onSubmit={onSubmitAddHandler}>
      <label>제목</label>
      <input type="text" name="title" value={title} onChange={onChangeTitleHandler} />
      <label>내용</label>
      <input type="text" name="body" value={body} onChange={onChangeBodyeHandler} />
      <button type="submit">제출</button>
    </form>
  );
}

export default Form;
