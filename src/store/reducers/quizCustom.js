import { 
  FETCH_CUSTOM_QUIZES_START, 
  FETCH_CUSTOM_QUIZES_SUCCESS, 
  FETCH_CUSTOM_QUIZES_ERROR, 
  FETCH_CUSTOM_QUIZ_SUCCESS, 
  CUSTOM_QUIZ_SET_STATE,
  FINISH_CUSTOM_QUIZ,
  CUSTOM_QUIZ_NEXT_QUESTION,
  CUSTOM_QUIZ_RETRY,
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  error: null,
  loading: false,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
}

export default function quizReducer(state=initialState, action) {
  switch (action.type) {
      case FETCH_CUSTOM_QUIZES_START:
          return {
              ...state, loading: true
          }
      case FETCH_CUSTOM_QUIZES_SUCCESS:
          return {
              ...state, loading: false, quizes: action.quizes
          }
      case FETCH_CUSTOM_QUIZES_ERROR:
          return {
              ...state, loading: false, error: action.error
          }
      case FETCH_CUSTOM_QUIZ_SUCCESS:
          return {
              ...state, loading: false, quiz: action.quiz
          }
      case CUSTOM_QUIZ_SET_STATE:
          return {
              ...state, answerState: action.answerState, results: action.results
          }
      case FINISH_CUSTOM_QUIZ:
          return {
              ...state, isFinished: true
          }
      case CUSTOM_QUIZ_NEXT_QUESTION:
          return {
              ...state, answerState: null, activeQuestion: action.number
          }
      case CUSTOM_QUIZ_RETRY:
          return {
              ...state,
              results: {},
              isFinished: false,
              activeQuestion: 0,
              answerState: null,
          }
      default:
          return state;
  }
}