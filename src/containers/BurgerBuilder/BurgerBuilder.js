import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-order";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        // loading: false,
    };
    componentDidMount() {
        this.props.initIngredientHandler();
    }

    updatePurchasable(ingredients) {
        const sum = Object.values(ingredients).reduce(
            (acc, curr) => acc + curr
        );
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated)
            this.setState({ purchasing: true });
        else {
            this.props.setAuthRedirectPathHandler('/checkout')
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.initPurchaseHandler();
        this.props.history.push('/checkout');
    };

    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be load!</p> : <Spinner />;

        if (this.props.ings) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelHandler={this.purchaseCancelHandler}
                    purchaseContinueHandler={this.purchaseContinueHandler}
                />
            );
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredientHandler={this.props.addIngredientHandler}
                        removeIngredientHandler={this.props.removeIngredientHandler}
                        ingredients={this.props.ings}
                        price={this.props.price}
                        isAuthenticated={this.props.isAuthenticated}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        purchaseHandler={this.purchaseHandler}
                    />
                </React.Fragment>
            );
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    backdropClickHandler={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
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


