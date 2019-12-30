import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
	state = {
		ingredients: null,
		price: 0,
	}

	UNSAFE_componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (const param of query.entries()) {
			if (param[0] === 'price')
				price = param[1]
			else
				ingredients[param[0]] = +param[1]
		}
		this.setState({ ingredients, price })
	}
	

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace(this.props.match.path + '/contact-data');
	}


	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelHandler={this.checkoutCancelHandler}
					checkoutContinueHandler={this.checkoutContinueHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					render={(props) =>
						<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />
					}
				/>
			</div>
		)
	}
}


