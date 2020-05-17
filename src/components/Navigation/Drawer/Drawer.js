import React, {Component} from 'react'

import classes from './Drawer.module.css'

import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={() => this.props.onClose()}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [
            classes.Drawer
        ]
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [
            {to: '/', label: 'English tests', exact: true},
        ]

        if (this.props.isAuthenticated) {
            if (this.props.isAdmin) {
                links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
            } else {
                links.push({to: '/custom-quizes', label: 'Ваши тесты', exact: false})
                links.push({to: '/custom-quiz-creator', label: 'Создать тест', exact: false})
            }
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }

        

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
               {this.props.isOpen? <Backdrop onClose={this.props.onClose}/>: null}
            </React.Fragment>
        )
    }
}

export default Drawer;
