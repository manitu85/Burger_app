import React, { useState, useEffect } from 'react'
import Wrapper from '../../hoc/Wrapper'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal'
import BuildControls from '../../components/Burger/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary'
import Spinner from '../../components/UI/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as burgerBuilderActions from '../../store/actions/index'


const BurgerBuilder = props => {
  // Destructuring props
  const {
    history,
    ings, 
    price, 
    error, 
    isAuthenticated,
    onIngredientAdded,
    onIngredientRemove,
    onInitIngredients,
    onInitPurchase,
    onSetAuthRedirectPath
  } = props
  
  // use state hooks
  const [order, setOrder] = useState(false)

  // componentDidMount once
  useEffect(() => {
    onInitIngredients()
  // eslint-disable-next-line
  }, [])

  // Methods
  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(iKey => {
      return ingredients[iKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    return sum > 0  
  }

  // Purchase handler
  const orderHandler = () => {
    if (isAuthenticated) {
      setOrder(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  const orderCancelHandler = () => {
    setOrder(false)
  }

  const orderContinueHandler = () => {
    onInitPurchase()
    history.push('/checkout')
  }


  const disabledInfo = {
    ...ings
  }

  for ( let key in disabledInfo ) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }

  let orderSummary = null;

  let burger =  error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if ( ings ) {
    burger = (
      <Wrapper>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemove}
          currentPrice={price}
          purchaseable={updatePurchaseState(ings)} // want to re-render
          ordered={orderHandler}
          disabledInfo={disabledInfo}
          isAuth={isAuthenticated}
        />
      </Wrapper>
    )
    orderSummary = <OrderSummary
      ingredients={ings}
      price={price}
      orderCancelled={orderCancelHandler}
      orderContinue={orderContinueHandler}
    />
  }

  return (
    <Wrapper>
      <Modal 
        modalClosed={orderCancelHandler}
        show={order}
      >
        { orderSummary }      
      </Modal> 
      { burger }
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemove: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
