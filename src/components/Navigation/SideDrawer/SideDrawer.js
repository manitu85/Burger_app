import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper';
import classes from './SideDrawer.module.scss';


const SideDrawer = props  => {
    // let attachedClasses = [classes.SideDrawer, classes.Close];
    // if (props.open) {
    //     attachedClasses = [classes.SideDrawer, classes.Open];
    // }
    return (
        <Wrapper>
            <Backdrop show={props.open} clicked={props.closed}/>
            {/* <div className={attachedClasses.join(' ')}> */}
            <div className={classes.SideDrawer}>
                <div className={classes.Logo}>
                    <Logo height={'50%'}/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Wrapper>
    );
};

export default SideDrawer;