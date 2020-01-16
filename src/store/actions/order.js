import { 
  PURCHASE_BURGER_SUCCESS, 
  PURCHASE_BURGER_FAIL 
} from './actionTypes'
import axios from '../../axios-orders'

// Sync functions
const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id, 
    orderData: orderData
  }
}

const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error: error
  }
}

// Async functions
export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data)
        dispatch(purchaseBurgerSuccess(res.data, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      })
  }
}


