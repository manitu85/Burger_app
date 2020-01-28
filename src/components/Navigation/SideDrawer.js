import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from './NavigationItems';
import Backdrop from '../UI/Backdrop';
import Wrapper from '../../hoc/Wrapper';
import classes from '../../styles/Navigation/SideDrawer.module.scss';


const SideDrawer = props  => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Wrapper>
            <Backdrop 
                show={props.open} 
                clicked={props.closed} 
            />
            <div 
              className={attachedClasses.join(' ')} 
              onClick={props.closed}  >
                <div className={classes.Logo}>
                    <Logo height={'50%'}/>
                </div>
                <nav >
                    <NavigationItems isAuthenticated={props.isAuth}  />
                </nav>
            </div>
        </Wrapper>
    );
};

export default SideDrawer;