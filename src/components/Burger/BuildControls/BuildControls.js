import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

export default function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    addIngredientHandler={() => { props.addIngredientHandler(ctrl.type) }}
                    removeIngredientHandler={() => props.removeIngredientHandler(ctrl.type)}
                    //addIngredientHandler={props.addIngredientHandler.bind(this,ctrl.type)}
                    //removeIngredientHandler={props.removeIngredientHandler.bind(this,ctrl.type)}
                    disabled={!props.ingredients[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.purchaseHandler}
            >
                ORDER NOW
            </button>
        </div>
    );
}
