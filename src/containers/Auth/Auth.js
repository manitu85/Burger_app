import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner'
import { updateObject, checkValidity } from '../../shared/utility'
import classes from '../../styles/Auth/Auth.module.scss'

const Auth = props => {
  
  // Destructuring props
  const { 
    loading,
    error,
    isAuthenticated,
    buildingBurger,
    authRedirectPath,
    onAuth,
    onSetAuthRedirectPath,
    } = props

  // use state hooks
  const [authForm, setAuthForm] = useState(false)
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  })


  // componentDidMount once
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  // eslint-disable-next-line
  }, [])
 
 
  // Methods
  const inputChangedHandler = ( e, controlName ) => {
    const updatedControls = updateObject( controls, {
        [controlName]: updateObject( controls[controlName], {
            value: e.target.value,
            valid: checkValidity( e.target.value, controls[controlName].validation ),
            touched: true
        } )
    })

    setControls(updatedControls)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    onAuth(controls.email.value, controls.password.value, authForm)
  }

  const switchAuthModeHandler = () => {
    setAuthForm(!authForm)
  }
  
  const formElementsArray = []
  for (let key in controls) {
    // Arr with objects inside
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  }

    
  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)} />
  ))

  if (loading) {
    form = <Spinner />
  }

  let errorMessage = null

  if (error) {
    errorMessage = (
      <p>{error.message}</p>
    )
  }

  let authRedirect = null // is by default
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath}/>
    }

  return (
    <div className={classes.Auth}>
      { authRedirect }
      { errorMessage }
      <p><strong>{authForm ? 'REGISTER' : 'LOGIN IN'}</strong></p>
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger">SWITCH TO {authForm ? 'LOGIN IN' : 'REGISTER'}
      </Button>
    </div>
  )

}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Auth)
