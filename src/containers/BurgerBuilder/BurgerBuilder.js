import React, { useState, useEffect, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-order";

export function BurgerBuilder(props) {
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    
    const dispatch = useDispatch();

    const addIngredientHandler = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const removeIngredientHandler = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const initPurchaseHandler = () => { dispatch(actions.purchaseInit()) };
    const setAuthRedirectPathHandler = (path) => { dispatch(actions.setAuthRedirectPath(path)) };
    const initIngredientHandler = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);

    //const { initIngredientHandler } = props;
    useEffect(() => {
        initIngredientHandler();
    }, [initIngredientHandler]);

    const updatePurchasable = ingredients => {
        const sum = Object.values(ingredients).reduce(
            (acc, curr) => acc + curr
        );
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated)
            setPurchasing(true);
        else {
            setAuthRedirectPathHandler('/checkout')
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        initPurchaseHandler();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be load!</p> : <Spinner />;

    if (ings) {
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCancelHandler={purchaseCancelHandler}
                purchaseContinueHandler={purchaseContinueHandler}
            />
        );
        burger = (
            <React.Fragment>
                <Burger ingredients={ings} />
                <BuildControls
                    addIngredientHandler={addIngredientHandler}
                    removeIngredientHandler={removeIngredientHandler}
                    ingredients={ings}
                    price={price}
                    isAuthenticated={isAuthenticated}
                    purchasable={updatePurchasable(ings)}
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

// const mapStateToProps = (state) => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null,

//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
//         removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
//         initIngredientHandler: () => dispatch(actions.initIngredients()),
//         initPurchaseHandler: () => { dispatch(actions.purchaseInit()) },
//         setAuthRedirectPathHandler: (path) => { dispatch(actions.setAuthRedirectPath(path)) },
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

export default withErrorHandler(BurgerBuilder, axios);


