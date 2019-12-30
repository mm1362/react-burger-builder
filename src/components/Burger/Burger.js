import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from "./Burger.module.css";

export default function Burger(props) {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey =>
            [...Array(props.ingredients[ingKey])].map((_, i) =>
                <BurgerIngredient key={ingKey + i} type={ingKey} />
            )
        )
        .reduce((acc, curr) => acc.concat(curr),[]);

    if (!transformedIngredients.length)
        transformedIngredients = <p>Please start adding ingredients!</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}
