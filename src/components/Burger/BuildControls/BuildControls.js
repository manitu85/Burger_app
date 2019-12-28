import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.scss'

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'}
]

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>${props.currentPrice.toFixed(2)}</strong></p>
    {
      controls.map(ctrl => (
        <BuildControl 
          key={ctrl.label} 
          label={ctrl.label} 
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]}
        />
      ))  
    }
    <button 
      className={classes.OrderButton} 
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >ORDER NOW</button>
  </div>
)


export default BuildControls
