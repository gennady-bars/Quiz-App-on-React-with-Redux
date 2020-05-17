import React from 'react'
import classes from './UserName.module.css'

const UserName = props => {
    return (
        <div className={classes.UserName}>
          {props.name}
        </div>
    )
}

export default UserName;