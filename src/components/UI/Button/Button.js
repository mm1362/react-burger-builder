import React from 'react'
import classes from "./Button.module.css";

export default function Button(props) {
    return (
        <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}    
        onClick={props.clickHandler}

        >
            {props.children}
        </button>
    )
}
