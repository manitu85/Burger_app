import React from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'



const App = () => {
  return (
   <Layout>
     <Switch>
       <Route exact path='/' component={BurgerBuilder} />
       <Route path='/checkout' component={Checkout} />
     </Switch>
   </Layout>
  )
}

export default App;
