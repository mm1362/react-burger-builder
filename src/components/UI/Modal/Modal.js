import React from 'react'
import classes from "./Modal.module.css";
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clickHandler={props.backdropClickHandler} />
            <div
                className={classes.Modal}
                style={{ transform: props.show ? 'translateX(0)' : 'translateX(-100vw)' }}
            >
                {props.children}
            </  div>
        </React.Fragment>
    )
}

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});
