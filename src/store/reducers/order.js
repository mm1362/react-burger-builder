import * as actionTypes from '../actions/actionsTypes';

const initialStat = {
	orders: [],
	loading: false,
	purchased: false,
}

// const INGREDIENT_PRICES = {
// 	salad: 0.5,
// 	bacon: 0.7,
// 	cheese: 0.4,
// 	meat: 1.3,
// };

export default function reducer(state = initialStat, action) {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false,
			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return {
				...state,
				orders: state.orders.concat({ ...action.orderData, id: action.orderId }),
				loading: false,
				purchased: true,
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
			};
		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false,
			};
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
}






