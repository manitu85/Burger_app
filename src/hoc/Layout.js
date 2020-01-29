import React, { useState } from 'react'
import { connect } from 'react-redux'

import Toolbar from '../components/Navigation/Toolbar'
import SideDrawer from '../components/Navigation/SideDrawer'
import classes from '../styles/Layout/Layout.module.scss'


const Layout = ({ children, isAuthenticated }) => {

  // use state hooks
  const [showSideDrawer, setShowSideDrawer ] = useState(false)
  
  // Methods
  const sideDrawerCloseHandler = () => setShowSideDrawer(false)
  const drawerToggleHandler = () => setShowSideDrawer(!showSideDrawer)
  
  return (
    <>
      <Toolbar 
        isAuth={isAuthenticated}
        drawerToggleClicked={drawerToggleHandler} 
      />
      <SideDrawer
        isAuth={isAuthenticated} 
        open={showSideDrawer}  
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.Content} >
        {children}
      </main>
    </>
  )
 }   


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null  // bind to this 
  }
}


export default connect(mapStateToProps)(Layout)


