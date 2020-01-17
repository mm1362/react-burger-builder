import React, { Component, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions";

// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";

const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'))
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'))
const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'))


class App extends Component {
	componentDidMount() {
		this.props.autoSignupHandler();
	}
	render() {
		let routs = (
			<Switch>
				<Route exact path='/' component={BurgerBuilder} />
				<Route exact path='/auth' component={AsyncAuth} />
				<Redirect to='/' />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routs = (
				<Switch>
					<Route path='/checkout' component={AsyncCheckout} />
					<Route exact path='/orders' component={AsyncOrders} />
					<Route exact path='/logout' component={Logout} />
					<Route exact path='/auth' component={AsyncAuth} />
					<Route exact path='/' component={BurgerBuilder} />
					<Redirect to='/' />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>
					<Suspense fallback={<div>Loading...</div>}>
						{routs}
					</Suspense>
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
