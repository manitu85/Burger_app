import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary'
import ContactData from './ContactData'


const Checkout = props => {
  // Destructuring props
  const { history, match, ings, purchased} = props

  // Methods
  const checkoutCancelledHandler = () => {
    history.goBack()
  }

  const checkoutContinueHandler = () => {
    history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to="/" />
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinueHandler} />
        <Route
          path={match.path + '/contact-data'}
          component={ContactData} />
      </div>
    )
  }

  return summary
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout)
