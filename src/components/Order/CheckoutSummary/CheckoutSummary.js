import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.module.css'


export default function CheckoutSummary(props) {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it taste well!</h1>
			<div style={{ with: "100%", margin: "auto" }}>
				<Burger ingredients={props.ingredients} />
				<Button btnType="Danger" clickHandler={props.checkoutCancelHandler}>
					CANCEL
				</Button>
				<Button btnType="Success" clickHandler={props.checkoutContinueHandler}>
					CONTINUE
				</Button>
			</div>
		</div>
	);
}
