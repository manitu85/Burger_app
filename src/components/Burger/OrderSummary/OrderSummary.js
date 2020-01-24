import React, { Component } from 'react'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  // UNSAFE_componentWillUpdate() {
  //   console.log([OrderSummary], "WillUpdate");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(iKey => {
      return <li key={iKey} ><span style={{ textTransform: 'capitalize' }} >{iKey}</span> : {this.props.ingredients[iKey]} </li>
    })
    return (
      <Wrapper>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${this.props.price.toFixed(2)} </strong></p>
        <p>Continue to Checkout</p>
        <Button
          btnType='Danger'
          clicked={this.props.orderCancelled}
        >CANCEL</Button>
        <Button
          btnType='Success'
          clicked={this.props.orderContinue}
        >CONTINUE</Button>
      </Wrapper>

    )
  }
}


export default OrderSummary
