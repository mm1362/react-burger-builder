import React from 'react'
import classes from './Order.module.css'

export default function Order(props) {
	let ingredients = [];
	for (const key in props.ingredients) {
		ingredients.push({ name: key, amount: props.ingredients[key] });
	}

	return (
		<div className={classes.Order}>
			<p>Ingredients:
				{ingredients.map(ig => <span key={ig.name} className={classes.Ingredient}>{ig.name}({ig.amount})</span>)}
			</p>
			<p>Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
		</div>
	)
}
