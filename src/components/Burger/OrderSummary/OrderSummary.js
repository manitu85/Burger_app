import React from 'react'
import Wrapper from '../../../hoc/Wrapper'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(iKey => {
      return <li key={iKey} ><span style={{textTransform: 'capitalize'}} >{iKey}</span> : { props.ingredients[iKey]} </li>
    })
  return (
    <Wrapper>
      <h3>Your order</h3>
      <p>A delicius burger with the folloving ingredients:</p>
      <ul>
        { ingredientSummary }
      </ul>
      <p>Continue to Checkout</p>
      <Button 
        btnType='Danger'
        clicked={props.orderCancelled} 
      >CANCEL</Button>
      <Button 
        btnType='Success'
        clicked={props.orderContinue} 
      >CONTINUE</Button>
    </Wrapper>

  )
}


export default OrderSummary
