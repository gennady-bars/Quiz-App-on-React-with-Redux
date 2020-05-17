import React, {Component} from 'react'

import classes from './Layout.module.css'

import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux';
import UserName from '../../components/Navigation/UserName/UserName';

class Layout extends Component {
    
    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }
     
    render() {
        return (
            <div className={classes.Layout}>
                <UserName 
                    name={this.props.name}
                />
                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    isAdmin={this.props.isAdmin}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
        isAdmin: state.auth.admin,
        name: state.auth.name
    }
}

export default connect(mapStateToProps)(Layout);