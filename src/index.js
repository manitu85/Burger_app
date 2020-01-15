import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import thunk from 'redux-thunk'
import App from './App'
import './styles/App.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  burgerBuilderReducer, 
  composeEnhancers(applyMiddleware(thunk))
)
 

const app = (
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

render(app, document.getElementById('root'))


