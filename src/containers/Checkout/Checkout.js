import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';


class Checkout extends Component {

  state = {
    ingredients: {
      meat: 1,
      chasse: 0,
      salad: 0,
      bacon: 0
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  }
}



export default Checkout;
