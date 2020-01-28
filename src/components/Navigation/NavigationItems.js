import React from 'react';
import NavigationItem from './NavigationItem';
import classes from '../../styles/Navigation/NavigationItems.module.scss';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated 
                ? <NavigationItem link="/orders">Orders</NavigationItem> 
                : null
            }
            {!props.isAuthenticated
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>
            }
    </ul>
);

export default NavigationItems;