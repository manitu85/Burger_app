import React, { memo } from 'react'
import classes from '../../styles/UI/Modal.module.scss'
import Backdrop from './Backdrop'
import Wrapper from '../../hoc/Wrapper'


const Modal = ({ show, modalClosed, children }) => {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== show || nextProps.children !== children
  // }
  
  return (
    <Wrapper>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
      >
        {children}
      </div>
    </Wrapper>
  )
}

  
export default memo(
  Modal, 
  (prevProps, nextProps) => 
  nextProps.show === prevProps.show &&
  nextProps.children === prevProps.children 
)
