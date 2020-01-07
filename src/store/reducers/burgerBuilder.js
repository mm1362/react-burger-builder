import * as actionTypes from '../actions/actionsTypes';

const initialStat = {
	ingredients: null,
	totalPrice: 4,
	error: false,
}

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3,
};

export default function reducer(state = initialStat, action) {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state);
		default:
			return state;
	}
}


function addIngredient(state, action) {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] + 1
		},
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		purchasable: true,
	};
}

function removeIngredient(state, action) {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] - 1
		},
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
	};
}

function setIngredients(state, action) {
	return {
		...state,
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: 4,
		error: false,
	};
}

function fetchIngredientsFailed(state) {
	return {
		...state,
		error: true,
	};
}



