import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'

import { fetchOrders } from '../../store/actions/index'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner'


const Orders = props => {
  // Destructuring props
  const { onFetchOrders, token, userId, loading} = props
  
  // ComponentDidMount once
  useEffect(() => {
    onFetchOrders(token, userId)
  // eslint-disable-next-line
  }, [])
  
  let orders = <Spinner />
  if(!loading) {
    orders = 
      props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
  }

  return (
    <div>
      { orders }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
