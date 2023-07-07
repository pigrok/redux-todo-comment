import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReview, deleteReview, editReview } from "../modules/review";
import shortid from "shortid";
import useInput from "../../api/useInput";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todos = useSelector((state) => state.todos);
  const todo = todos.find((todo) => todo.id === id);

  const reviews = useSelector((state) => state.reviews);

  const [writer, onChangeWriterHandler] = useInput();
  const [contents, onChangeContentsHandler] = useInput();

  const [editReviews, setEditReviews] = useState(false);
  const [editedWriter, setEditedWriter] = useState("");
  const [editedContents, setEditedContents] = useState("");
  const [editedReviewId, setEditedReviewId] = useState("");

  const addHandler = (e) => {
    e.preventDefault();
    if (!writer || !contents) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return false;
    }
    const newReview = {
      id: shortid.generate(),
      writer,
      contents,
      todoId: todo?.id,
    };
    dispatch(addReview(newReview));

    onChangeWriterHandler({ target: { value: "" } });
    onChangeContentsHandler({ target: { value: "" } });
  };

  const deleteHandler = (review) => {
    dispatch(deleteReview(review));
  };

  const editHandler = (reviewId) => {
    if (!editedWriter || !editedContents) {
      alert("필수 값이 누락되었습니다. 확인 해주세요!");
      return false;
    }
    const editedReview = {
      writer: editedWriter,
      contents: editedContents,
      id: reviewId,
      isModified: true,
    };
    dispatch(editReview(editedReview));
    setEditReviews(false);
    setEditedWriter("");
    setEditedContents("");
  };

  return (
    <div>
      <div>
        {todo?.title}
        <br />
        {todo?.body}
        <br />
      </div>
      <form onSubmit={addHandler}>
        <input
          type="text"
          name="이름"
          value={writer}
          onChange={onChangeWriterHandler}
        />
        <input
          type="text"
          name="내용"
          value={contents}
          onChange={onChangeContentsHandler}
        />
        <button type="submit">등록</button>
      </form>
      <div
        style={{ border: "1px solid black", padding: "20px", margin: "20px" }}
      >
        {reviews.map((review) => {
          const isEditing = editReviews && review.id === editedReviewId;
          return (
            <div key={review.id}>
              <p>writer: {review.writer}</p>
              {isEditing ? (
                <textarea
                  value={editedWriter}
                  onChange={(e) => setEditedWriter(e.target.value)}
                />
              ) : (
                <></>
              )}
              <div>contents: {review.contents}</div>
              {isEditing ? (
                <textarea
                  value={editedContents}
                  onChange={(e) => setEditedContents(e.target.value)}
                />
              ) : (
                <></>
              )}
              {isEditing ? (
                <div>
                  <button onClick={() => editHandler(review.id)}>save</button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setEditReviews(true);
                      setEditedReviewId(review.id);
                      setEditedWriter(review.writer);
                      setEditedContents(review.contents);
                    }}
                  >
                    edit
                  </button>
                  <button onClick={() => deleteHandler(review.id)}>
                    delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Detail;
