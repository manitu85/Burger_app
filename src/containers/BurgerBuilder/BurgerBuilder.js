import React, { Component } from 'react'
import Wrapper from '../../hoc/Wrapper/Wrapper'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
  
  state = {
    purchaseable: false,
    order: false,  // purchasing
  }

  componentDidMount() {
    console.log(this.props);
   
  }
  
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(iKey => {
      return ingredients[iKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    return sum > 0  
  }

  orderHandler = () => {
    this.setState({ order: true })
  }

  orderCancelHandler = () => {
    this.setState({ order: false })
  }


  orderContinueHandler = () => {
    this.props.history.push('/checkout')
  }


  render() {
    const disabledInfo = {
      ...this.props.ings
    }

    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    let burger =  this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if ( this.props.ings ) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            currentPrice={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)} // want to re-render
            ordered={this.orderHandler}
            disabledInfo={disabledInfo}
          />
        </Wrapper>
      )
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        orderCancelled={this.orderCancelHandler}
        orderContinue={this.orderContinueHandler}
      />
    }

    return (
      <Wrapper>
        <Modal 
          modalClosed={this.orderCancelHandler}
          show={this.state.order}
        >
          { orderSummary }      
        </Modal> 
        { burger }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
