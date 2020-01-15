import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions";

class App extends Component {
	componentDidMount() {
		this.props.autoSignupHandler();
	}
	render() {
		let routs = (
			<Switch>
				<Route exact path='/' component={BurgerBuilder} />
				<Route exact path='/auth' component={Auth} />
				<Redirect to='/'/>
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routs = (
				<Switch>
					<Route exact path='/' component={BurgerBuilder} />
					<Route exact path='/orders' component={Orders} />
					<Route exact path='/logout' component={Logout} />
					<Route path='/checkout' component={Checkout} />
					<Redirect to='/'/>
				</Switch>
			);
		}
		return (
			<div>
				<Layout>
					{routs}
				</Layout>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

function mapDispatchToProps(dispatch) {
	return {
		autoSignupHandler: () => { dispatch(actions.authCheckState()) },
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
