import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './CustomQuizList.module.css'

import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {fetchQuizes} from '../../store/actions/quizCustom' 

class QuizList extends Component {

    renderQuizes() {
        return [...this.props.quizes].map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/customQuiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount(){
        this.props.fetchQuizes()
    }

    render() {

        return (
            <div className={classes.QuizList}>
                <div style={{width: '100%'}}>
                    <h1>Custom Tests</h1>
                    {
                        this.props.loading && this.props.quizes.length !== 0
                        ? <Loader />
                        : <ul>
                            {this.renderQuizes()}
                          </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quizCustom.quizes,
        loading: state.quizCustom.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);