import { 
  PURCHASE_INIT,
  PURCHASE_BURGER,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS, 
  PURCHASE_BURGER_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS
} from './actionTypes'
// import axios from '../../axios-orders'


// Purchasing Burger
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id, 
    orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return {
    type: PURCHASE_BURGER,
    orderData,
    token
  }
}

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT
  }
}

// Fetching Orders
export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFail = error => {
  return {
    type: FETCH_ORDERS_FAIL,
    error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return {
    type: FETCH_ORDERS,
    token,
    userId
  }
}


