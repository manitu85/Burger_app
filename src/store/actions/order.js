import { 
  PURCHASE_BURGER_SUCCESS, 
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS
} from './actionTypes'


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
    type: PURCHASE_BURGER_START,
    orderData: orderData,
    token: token
    
  }
  // return dispatch => {
  //   dispatch(purchaseBurgerStart())
  //   axios.post('/orders.json?auth=' + token, orderData)
  //     .then(response => {
  //       dispatch(purchaseBurgerSuccess(response.data.name, orderData))
  //     })
  //     .catch(error => {
  //       dispatch(purchaseBurgerFail(error))
  //     })
  // }
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
    token: token,
    userId: userId
  }
  // return dispatch => {
  //   dispatch(fetchOrdersStart())
  //   const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
  //   axios.get('/orders.json' + queryParams)
  //     .then(res => {
  //       const fetchedOrders = []
  //       for (let key in res.data) {
  //         fetchedOrders.push({
  //           ...res.data[key],
  //           id: key
  //         })
  //       }
  //       dispatch(fetchOrdersSuccess(fetchedOrders))
  //     })
  //     .catch(err => {
  //       dispatch(fetchOrdersFail(err))
  //     })
  // }
}


