import React from 'react'
import classes from '../../styles/Navigation/DrawerToggle.module.scss'

const DrawerToggle = props => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle