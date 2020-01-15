import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { Redirect } from 'react-router-dom';

class Logout extends Component {
	componentDidMount() {
		console.log('Logout componentDidMount');

		this.props.logoutHandler();
	}

	render() {
		return <Redirect to="/" />;
	}
}

// function mapStateToProps(state) {
// 	return {
// 		isAuthenticated: state.auth.token !== null,
// 	};
// };

function mapDispatchToProps(dispatch) {
	return {
		logoutHandler: () => { dispatch(actions.logout()) },
	}
};


export default connect(null, mapDispatchToProps)(Logout);