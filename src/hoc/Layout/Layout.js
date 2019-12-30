import React, { Component } from 'react'
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";


export default class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((state)=>({showSideDrawer:!state.showSideDrawer}))
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar drawerToggleHandler={this.sideDrawerToggleHandler} />
                <SideDrawer show={this.state.showSideDrawer} sideDrawerCloseHandler={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        )
    }
}



