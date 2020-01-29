import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'

import Button from '../../components/UI/Button'
import Spinner from '../../components/UI/Spinner'
import Input from '../../components/UI/Input'
import withErrorHandler from '../../hoc/withErrorHandler'
import { purchaseBurger } from '../../store/actions/index'
import { updateObject, checkValidity } from '../../shared/utility'
import classes from '../../styles/Checkout/ContactData.module.scss'


const ContactData = props => {
  // Destructuring props
  const { ings, price, userId, token, onOrderBurger, loading } = props
  
  // use state hooks
  const [formIsValid, setFormIsValid] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  })
   
  // Methods
  const orderHandler = e => {
    e.preventDefault()

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: ings,
      price, 
      orderData: formData,
      userId
    }

    onOrderBurger(order, token)
  }

  const inputChangedHandler = (e, inputIdentifier) => {

    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: e.target.value,
      valid: checkValidity(e.target.value, orderForm[inputIdentifier].validation),
      touched: true
    })

    const updatedOrderForm = updateObject(orderForm, {
      // dynamically enhanced object key (name, street, ...email state)
      [inputIdentifier]: updatedFormElement
    })

    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    setOrderForm(updatedOrderForm) 
    setFormIsValid(formIsValid)
  }

  
  const formElementsArr = []
   for (let key in orderForm) {
      formElementsArr.push({
        id: key,
        config: orderForm[key]
      })
   }

    let form = (
      <form onSubmit={orderHandler}>
      {formElementsArr.map(formElement => (
        <Input 
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value} 
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={ e => inputChangedHandler(e, formElement.id)} 
          
        />
       ))}
      <Button 
        btnType="Success" 
        clicked={orderHandler}
        disabled={!formIsValid}
      >ORDER</Button>
      </form>
    )

    if (loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))

