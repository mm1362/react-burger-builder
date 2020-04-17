import React, { Component } from 'react'
import classes from "./Modal.module.css";
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children
	}

	render() {
		return (
			<React.Fragment>
				<Backdrop show={this.props.show} clickHandler={this.props.backdropClickHandler} />
				<div
					className={classes.Modal}
					style={{ transform: this.props.show ? 'translateX(0)' : 'translateX(-100vw)' }}
				>
					{this.props.children}
				</div>
			</React.Fragment>
		)
	}
}

export default Modal;