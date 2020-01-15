import { ADD_INGREDIENT } from '../actions/actionTypes'
import { REMOVE_INGREDIENT } from '../actions/actionTypes'


const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 2,
}

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.2,
  meat: 1.5,
  bacon: 0.8
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_INGREDIENT:
      return {
        ...state, 
        ingredients: {
          ...state.ingredients,
          // payload
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1

        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // payload
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }

  default:
    return state
  }
}

export default reducer
