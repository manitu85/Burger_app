import React from 'react'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems'
import DrawerToggle from './DrawerToggle'
import classes from '../../styles/Navigation/Toolbar.module.scss'

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  )
}

export default Toolbar
