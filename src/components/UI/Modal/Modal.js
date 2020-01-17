import React, { Component } from 'react'
import classes from './Modal.module.scss'
import Backdrop from '../Backdrop/Backdrop'
import Wrapper from '../../../hoc/Wrapper/Wrapper'


class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  // UNSAFE_componentWillUpdate() {
  //   console.log([Modal], "WillUpdate")
  // }
  
  render() {
    return (
      <Wrapper>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Wrapper>
    )
  }
}
  
export default Modal
