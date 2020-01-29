import React  from 'react'
import Wrapper from '../../hoc/Wrapper'
import Button from '../UI/Button'

const OrderSummary = props => {

  // Destructuring props
  const { ingredients, price, orderCancelled, orderContinue } = props
  
  // Methods
  const ingredientSummary = Object.keys(ingredients).map(iKey => {
    return <li key={iKey} ><span style={{ textTransform: 'capitalize' }} >{iKey}</span> : {ingredients[iKey]} </li>
  })

  return (
    <Wrapper>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: ${price.toFixed(2)} </strong></p>
      <p>Continue to Checkout</p>
      <Button
        btnType='Danger'
        clicked={orderCancelled}
      >CANCEL</Button>
      <Button
        btnType='Success'
        clicked={orderContinue}
      >CONTINUE</Button>
    </Wrapper>
  )
}


export default OrderSummary
