import { ADD_INGREDIENT } from './actionTypes'
import { REMOVE_INGREDIENT} from './actionTypes'
import { SET_INGREDIENTS } from './actionTypes'
import { FETCH_INGREDIENTS_FAILD } from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = name => {
  return {
    type: ADD_INGREDIENT,
    ingredientName: name
  }
}

export const removeIngredient = name => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName: name
  }
}

export const setIngredients = ingredients => {
  return {
    type: SET_INGREDIENTS,
    ingredients: ingredients
  }
} 

export const fetchIngredientsFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILD,
  }
} 

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-burger-001ffa.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      })
  }
}