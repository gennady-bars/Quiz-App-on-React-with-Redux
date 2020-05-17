import { CREATE_CUSTOM_QUIZ_QUESTION, RESET_CUSTOM_QUIZ_CREATION } from "../actions/actionTypes";

const initialState = {
  quiz: []
}

export default function createReducer(state=initialState, action) {
  switch (action.type) {
    case CREATE_CUSTOM_QUIZ_QUESTION:
      return {
        ...state, quiz: [...state.quiz, action.item]
      }
    case RESET_CUSTOM_QUIZ_CREATION:
      return {
        ...state, quiz: []
      }
    default:
      return state;
  }
}