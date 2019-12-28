import React, {Component} from 'react'
import Wrapper  from '../../hoc/Wrapper'
import classes from './Layout.module.scss'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandle = () => {
    this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <Wrapper>
        <Toolbar />
        <SideDrawer 
          open={this.state.showSideDrawer}  
          closed={this.sideDrawerCloseHandle}
        />
        <main className={classes.Content} >
          {this.props.children}
        </main>
      </Wrapper>
    )
  }
}
 

export default Layout
