import React, { useState } from 'react'
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';


function Layout(props) {
    const [showSideDrawer, setShowSideDrawer] = useState (false);
    // state = {
    //     showSideDrawer: false,
    // }

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false)
    }
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(state => !state)
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                drawerToggleHandler={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                show={showSideDrawer}
                sideDrawerCloseHandler={sideDrawerCloseHandler}
            />
            <main className={classes.Content}>{props.children}</main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		authHandler: (email, password, isSignup) => { dispatch(actions.auth(email, password, isSignup)) },
// 	};
// };

export default connect(mapStateToProps)(Layout);



