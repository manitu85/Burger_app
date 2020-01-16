import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT, 
  SET_INGREDIENTS, 
  FETCH_INGREDIENTS_FAILED 
} from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.2,
  meat: 1.5,
  bacon: 0.8
}

const initialState = {
  ingredients: null,
  totalPrice: 3,
  error: false
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

    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false
      }

    case FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }

  default:
    return state
  }
}

export default reducer
