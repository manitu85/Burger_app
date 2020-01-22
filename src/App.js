import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth  from './containers/Auth/Auth'


const App = () => {
  return (
   <Layout>
     <Switch>
       <Route exact path='/' component={BurgerBuilder} />
       <Route path='/checkout' component={Checkout} />
       <Route path='/orders' component={Orders} />
       <Route path='/auth' component={Auth} />
     </Switch>
   </Layout>
  )
}

export default App;
