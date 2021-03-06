import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

export default function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
			</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authentication</NavigationItem>}
        </ul>
    );
}
