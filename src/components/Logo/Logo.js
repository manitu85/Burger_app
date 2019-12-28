import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.scss'

const Logo = props => {
  return (
    <div className={classes.Logo} style={{height: props.height}} >
      <img src={burgerLogo} alt='Burger Logo'/>
    </div>
  )
}

export default Logo
