import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  // componentDidMount() {
    
  // }
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    // alert(this.props.price)
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      // const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {/* {purchasedRedirect} */}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinueHandler} />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout)
