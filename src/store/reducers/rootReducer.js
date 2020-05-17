import {combineReducers} from 'redux'
import quizReducer from './quiz'
import createReducer from './create'
import authReducer from './auth'
import createCustomReducer from './createCustom'
import quizCustomReducer from './quizCustom'

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer,
    createCustom: createCustomReducer,
    quizCustom: quizCustomReducer
})