import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.scss'


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => this.setState({showSideDrawer: false})
  

  drawerToggleHandler = () => this.setState(prevState => {
    return { showSideDrawer: !prevState.showSideDrawer }
  })
    
  
  render() {
    console.log(this.props.isAuthenticated);
    
    return (
      <>
        <Toolbar 
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.drawerToggleHandler} 
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated} 
          open={this.state.showSideDrawer}  
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content} >
          {this.props.children}
        </main>
      </>
    )
  }
}
 
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null  // bind to this 
  }
}


export default connect(mapStateToProps)(Layout)


