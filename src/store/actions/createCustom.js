import { CREATE_CUSTOM_QUIZ_QUESTION, RESET_CUSTOM_QUIZ_CREATION } from './actionTypes'
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
  return {
    type: CREATE_CUSTOM_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_CUSTOM_QUIZ_CREATION
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const userId = localStorage.getItem('userId')
     await axios.post(`/customQuizes/${userId}.json`, getState().createCustom.quiz)
     dispatch(resetQuizCreation())
  }
}