import React, { Component } from 'react'
import Wrapper from '../../hoc/Wrapper/Wrapper'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.2,
  meat: 1.5,
  bacon: 0.8
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    order: false,  // purchasing
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-burger-001ffa.firebaseio.com/ingredients.json')
    .then(res => {
      this.setState({ ingredients: res.data })
    })
    .catch(error => this.setState({error: true}))
  }
  

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if( oldCount <= 0) { return }
    const updatedCount = oldCount - 1
    const updatedIngredients = { ...this.state.ingredients }
    updatedIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceDeduction
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients)
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(iKey => {
      return ingredients[iKey]
    })
    .reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({
      purchaseable: sum > 0
    })
  }

  orderHandler = () => {
    this.setState({ order: true })
  }

  orderCancelHandler = () => {
    this.setState({ order: false })
  }


  orderContinueHandler = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Lesa Milesian',
        address: {
          street: 'Jovian Chirico 13',
          zipCode: '12423',
          country: 'Hungary'
        },
        email: 'test@test.com' 
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(res => this.setState({
        loading: false,
        order: false
      }))
      .catch(err => this.setState({
        loading: false,
        order: false
      }))
  }


  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;

    let burger =  this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if ( this.state.ingredients ) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            currentPrice={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.orderHandler}
            disabledInfo={disabledInfo}
          />
        </Wrapper>
      )
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        orderCancelled={this.orderCancelHandler}
        orderContinue={this.orderContinueHandler}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Wrapper>
        <Modal 
          modalClosed={this.orderCancelHandler}
          show={this.state.order}  // order
        >
          { orderSummary }      
        </Modal> 
        { burger }
      </Wrapper>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
