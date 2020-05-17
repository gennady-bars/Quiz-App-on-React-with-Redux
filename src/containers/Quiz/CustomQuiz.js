import React from 'react'
import { connect } from 'react-redux';
import classes from './Quiz.module.css'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quizCustom'

class CustomQuiz extends React.Component {

   componentDidMount() { 
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы, {this.props.userName}</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished 
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryQuiz}
                                to={'/custom-quizes'}
                             />
                            : <ActiveQuiz 
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quizCustom.results,
        isFinished: state.quizCustom.isFinished,
        activeQuestion: state.quizCustom.activeQuestion,
        answerState: state.quizCustom.answerState,
        quiz: state.quizCustom.quiz,
        loading: state.quizCustom.loading,
        userName: state.auth.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomQuiz);