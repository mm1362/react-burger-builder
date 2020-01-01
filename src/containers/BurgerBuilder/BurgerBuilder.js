import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };
    componentDidMount() {
        // axios
        //     .get("/ingredients.json")
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({ error: true });
        //     });
    }

    updatePurchasable(ingredients) {
        const sum = Object.values(ingredients).reduce(
            (acc, curr) => acc + curr
        );
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => { this.props.history.push('/checkout'); };
    
    render() {
        let orderSummary = null;
        let burger = this.state.error ? null : <Spinner />;

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
                        purchasable={this.updatePurchasable(this.props.ings)}
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

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName }),
        removeIngredientHandler: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
