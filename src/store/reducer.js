import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialStat = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	},
	totalPrice: 4,
}

export default function reducer (state = initialStat, action) {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return {
				...state,
				ingredients:{
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
				purchasable: true,
			};

		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients:{
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
			};

		default:
			return state;
	}
}



