import React from 'react'
import classes from '../../styles/UI/Backdrop.module.scss'

const Backdrop = props => props.show ? <div className={classes.Backdrop} onClick={props.clicked} ></div> : null


export default Backdrop
