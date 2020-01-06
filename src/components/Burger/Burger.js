import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.scss'

const Burger = props => {
  // The value of object is important for how to decide many ingredients required and the keys is important for which types of ingredients needed.
  let transformedIngredients = Object.keys(props.ingredients).map(iKey => {
    return [...Array(props.ingredients[iKey])].map((_, i) => <BurgerIngredient key={iKey + i} type={iKey} /> )
  })
  .reduce((arr, el) => {
    return arr.concat(el)
  }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  console.log(transformedIngredients)

  return (
    <div className={classes.Burger} >
      <BurgerIngredient  type='bread-top' />
        { transformedIngredients }
      <BurgerIngredient  type='bread-bottom' />
    </div>
  )
}

export default Burger
