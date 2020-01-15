import React, { Component } from 'react'
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHandler = () => {
        this.setState((state) => ({ showSideDrawer: !state.showSideDrawer }))
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    drawerToggleHandler={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    sideDrawerCloseHandler={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
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



