import React, {Component} from 'react'
import Wrapper  from '../Wrapper/Wrapper'
import classes from './Layout.module.scss'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => this.setState({showSideDrawer: false})
  

  drawerToggleHandler = () => this.setState(prevState => {
    return { showSideDrawer: !prevState.showSideDrawer }
  })
    
  
  render() {
    return (
      <Wrapper>
        <Toolbar drawerToggleClicked={this.drawerToggleHandler} />
        <SideDrawer 
          open={this.state.showSideDrawer}  
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content} >
          {this.props.children}
        </main>
      </Wrapper>
    )
  }
}
 

export default Layout


