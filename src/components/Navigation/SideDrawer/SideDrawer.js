import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

export default function SideDrawer(props) {
	//const attachedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ');
	return (
		<React.Fragment>
			<Backdrop show={props.show} clickHandler={props.sideDrawerCloseHandler} />
			<div
				className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}
				onClick={props.sideDrawerCloseHandler}
			>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuthenticated} />
				</nav>
			</div>
		</React.Fragment>
	)
}
