import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle'

export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle drawerToggleHandler={props.drawerToggleHandler} >MENU</DrawerToggle>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}
