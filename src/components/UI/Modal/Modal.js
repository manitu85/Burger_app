import React from 'react'
import classes from './Modal.module.scss'
import Backdrop from '../Backdrop/Backdrop'
import Wrapper from '../../../hoc/Wrapper'


const Modal = props => (
  <Wrapper>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div  
      className={classes.Modal} 
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}  
    >
      {props.children}
    </div>
  </Wrapper>
)


export default Modal
