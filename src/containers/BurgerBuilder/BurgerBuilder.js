import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };
    componentDidMount() {
        axios
            .get("/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: true });
            });
    }

    updatePurchasable(ingredients) {
        const sum = Object.values(ingredients).reduce(
            (acc, curr) => acc + curr
        );
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = type => {
        //this.state.totalPrice += 1;
        const newState = { ...this.state };
        newState.ingredients[type]++;
        newState.totalPrice += INGREDIENT_PRICES[type];
        this.setState(newState);
        this.updatePurchasable(newState.ingredients);
    };
    removeIngredientHandler = type => {
        const newState = { ...this.state };
        newState.ingredients[type]--;
        newState.totalPrice -= INGREDIENT_PRICES[type];
        this.setState(newState);
        this.updatePurchasable(newState.ingredients);
    };
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (const i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
            //queryParams.push(i + "=" + this.state.ingredients[i]);
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        console.log(queryString);
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString ,
        });
    };
    render() {
        let orderSummary = null;
        let burger = this.state.error ? null : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelHandler={this.purchaseCancelHandler}
                    purchaseContinueHandler={this.purchaseContinueHandler}
                />
            );
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredientHandler={this.addIngredientHandler}
                        removeIngredientHandler={this.removeIngredientHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchaseHandler={this.purchaseHandler}
                    />
                </React.Fragment>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

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
export default withErrorHandler(BurgerBuilder, axios);
