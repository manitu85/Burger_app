import React, { useEffect, Suspense, lazy } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from './store/actions/index'
import Layout from './hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout'
import Spinner from './components/UI/Spinner'

// Import react lazy loading components
const Checkout = lazy( () =>  import('./containers/Checkout/Checkout') )
const Orders = lazy( () => import('./containers/Orders/Orders') )
const Auth = lazy( () => import('./containers/Auth/Auth') )


const App = ({ onTryAutoSignup, isAuthenticated }) => {
   
   // ComponentDidMount once
   useEffect(() => {
      onTryAutoSignup()
   // eslint-disable-next-line
   }, [])

  let routes = (
    <Switch>
      <Route path="/auth" render={ props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={ props => <Checkout {...props} />} />
        <Route path="/orders" render={ props => <Orders {...props} />} />
        <Route path="/auth" render={ props => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={ <Spinner /> } >
          {routes}
        </Suspense>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState() )
  }
}


export default withRouter(
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(App)
)
