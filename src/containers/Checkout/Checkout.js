import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

function Checkout(props) {
	const checkoutCancelHandler = () => {
		props.history.goBack();
	};

	const checkoutContinueHandler = () => {
		props.history.replace(props.match.path + "/contact-data");
	};

	let summary = <Redirect to="/" />;
	if (props.ings) {
		let purchaseRedirect = props.purchased ? <Redirect to="/" /> : null
		summary = (
			<div>
				{purchaseRedirect}
				<CheckoutSummary
					ingredients={props.ings}
					checkoutCancelHandler={checkoutCancelHandler}
					checkoutContinueHandler={checkoutContinueHandler}
				/>
				<Route
					path={props.match.path + "/contact-data"}
					component={ContactData}
				/>
			</div>
		);
	}

	return summary
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	};
};

export default connect(mapStateToProps)(Checkout);
