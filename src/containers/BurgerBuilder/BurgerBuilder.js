import React, { useState, useEffect } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-order";

export function BurgerBuilder(props) {
    const [purchasing, setPurchasing] = useState(false);
    useEffect(() => {
        props.initIngredientHandler();
    }, []);

    const updatePurchasable = ingredients => {
        const sum = Object.values(ingredients).reduce(
            (acc, curr) => acc + curr
        );
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated)
            setPurchasing(true);
        else {
            props.setAuthRedirectPathHandler('/checkout')
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.initPurchaseHandler();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be load!</p> : <Spinner />;

    if (props.ings) {
        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                price={props.price}
                purchaseCancelHandler={purchaseCancelHandler}
                purchaseContinueHandler={purchaseContinueHandler}
            />
        );
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls
                    addIngredientHandler={props.addIngredientHandler}
                    removeIngredientHandler={props.removeIngredientHandler}
                    ingredients={props.ings}
                    price={props.price}
                    isAuthenticated={props.isAuthenticated}
                    purchasable={updatePurchasable(props.ings)}
                    purchaseHandler={purchaseHandler}
                />
            </React.Fragment>
        );
    }


    return (
        <React.Fragment>
            <Modal
                show={purchasing}
                backdropClickHandler={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        initIngredientHandler: () => dispatch(actions.initIngredients()),
        initPurchaseHandler: () => { dispatch(actions.purchaseInit()) },
        setAuthRedirectPathHandler: (path) => { dispatch(actions.setAuthRedirectPath(path)) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


