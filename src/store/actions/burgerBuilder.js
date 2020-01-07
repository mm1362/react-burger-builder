import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios-order";

export function addIngredient(name) {
	return {
		type: actionTypes.ADD_INGREDIENTS,
		ingredientName: name
	};
}

export function removeIngredient(name) {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
}


export function setIngredients(ingredients) {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients
	};
}

export function fetchIngredientsFailed() {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	};
}
export function initIngredients() {
	return dispatch => {


		axios.get("/ingredients.json")
			.then(response => {
				// console.log(response.data	);
				dispatch(setIngredients(response.data));
			})
			.catch(error => {
				console.log(error);
				dispatch(fetchIngredientsFailed());
			});
	};
}


