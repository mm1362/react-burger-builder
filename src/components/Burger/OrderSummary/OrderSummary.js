import React, { Component } from 'react'
import Button from '../../UI/Button/Button'

export default class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey =>
                <li key={igKey + this.props.ingredients[igKey]}>
                    <span style={{ textTransform: "capitalize" }}>{igKey}</span> : {this.props.ingredients[igKey]}
                </li>
            )
        return (
            <React.Fragment>
                <h3>Your Order</h3> 
                <p>A delicious burger with the following gradients:</p>
                <ul>{ingredientSummary}</ul>
                <p>Total Price: {this.props.price.toFixed(2)}</p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clickHandler={this.props.purchaseCancelHandler} >CANCEL</Button>
                <Button btnType="Success" clickHandler={this.props.purchaseContinueHandler} >CONTINUE</Button>
            </React.Fragment>)
    }
}

