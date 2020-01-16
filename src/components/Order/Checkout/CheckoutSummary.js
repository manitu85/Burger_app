import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.scss'


const CheckoutSummary = props => {
  console.log(props.checkoutContinued)
  return (
    <div className={classes.CheckoutSummary} >
      <h1>We hope taste well!!</h1>        
      <div style={{width: '100%', margin:'auto'}} >
        <Burger ingredients={props.ingredients} />
        <Button 
          btnType='Danger'
          clicked={props.checkoutCancelled}
        >CANCEL</Button>
        <Button 
          btnType='Success'
          clicked={props.checkoutContinued}
        >CONTINUE</Button>
      </div>
    </div>
  )
}

export default CheckoutSummary
