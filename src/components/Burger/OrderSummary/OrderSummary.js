import React from 'react'
import Button from '../../UI/Button/Button'

export default function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>
            <li key={igKey + props.ingredients[igKey]}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        )
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following gradients:</p>
            <ul>{ingredientSummary}</ul>
            <p>Total Price: {props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clickHandler={props.purchaseCancelHandler} >CANCEL</Button>
            <Button btnType="Success" clickHandler={props.purchaseContinueHandler} >CONTINUE</Button>
        </React.Fragment>)
}

