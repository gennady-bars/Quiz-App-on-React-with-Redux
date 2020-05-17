import axios from '../../axios/axios-quiz'
import { 
    FETCH_CUSTOM_QUIZES_START, 
    FETCH_CUSTOM_QUIZES_SUCCESS, 
    FETCH_CUSTOM_QUIZES_ERROR, 
    FETCH_CUSTOM_QUIZ_SUCCESS,
    CUSTOM_QUIZ_SET_STATE,
    FINISH_CUSTOM_QUIZ,
    CUSTOM_QUIZ_NEXT_QUESTION,
    CUSTOM_QUIZ_RETRY,
} from './actionTypes'

export function fetchQuizes() {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        const userId = localStorage.getItem('userId')
        
        try {
            let response = await axios.get(`/customQuizes/${userId}.json`)
            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))

        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        const userId = localStorage.getItem('userId')

        try {
            const response = await axios.get(`/customQuizes/${userId}/${quizId}.json`)
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_CUSTOM_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_CUSTOM_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_CUSTOM_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_CUSTOM_QUIZES_ERROR,
        error
    }
}

export function quizSetState(answerState, results) {
    return {
        type: CUSTOM_QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_CUSTOM_QUIZ,
    }
}

export function quizNextQuestion(number) {
    return {
        type: CUSTOM_QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: CUSTOM_QUIZ_RETRY,
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quizCustom
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = {...state.results}

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) results[question.id] = 'success';

            dispatch(quizSetState({[answerId]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())

                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)

            
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results))
        } 
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length 

}
