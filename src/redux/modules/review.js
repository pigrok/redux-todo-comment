import shortid from "shortid";

const ADD_REVIEW = "todos/ADD_REVIEW";
const DELETE_REVIEW = "todos/DELETE_REVIEW";
const EDIT_REVIEW = "todos/EDIT_REVIEW";

export const addReview = (payload) => {
  return {
    type: ADD_REVIEW,
    payload,
  };
};

export const deleteReview = (payload) => {
  return {
    type: DELETE_REVIEW,
    payload,
  };
};

export const editReview = (payload) => {
  return {
    type: EDIT_REVIEW,
    payload,
  };
};

const initialState = [
  {
    id: shortid.generate(),
    writer: "피그록",
    contents: "고생하셨어요",
  },
];

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.payload];

    case DELETE_REVIEW:
      return state.filter((review) => review.id !== action.payload);

    case EDIT_REVIEW:
      return state.map((review) =>
        review.id === action.payload.id ? action.payload : review
      );

    default:
      return state;
  }
};

export default reviews;
