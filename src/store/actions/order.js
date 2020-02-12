import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios-order";

export function purchaseInit() {
	return {
		type: actionTypes.PURCHASE_INIT
	};
}

export function purchaseBurgerStart() {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
	};
}

export function purchaseBurgerSuccess(id, orderData) {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData,
	};
}
export function purchaseBurgerFail(error) {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error,
	};
}

export function purchaseBurger(orderData, token) {
	// return dispatch => {
	// 	dispatch(purchaseBurgerStart());
	// 	axios.post('/orders.json?auth=' + token, orderData)
	// 		.then(response => {
	// 			dispatch(purchaseBurgerSuccess(response.data.name, orderData));
	// 		})
	// 		.catch(error => {
	// 			console.log(error)
	// 			dispatch(purchaseBurgerFail(error));
	// 		});
	// };
	return {
		type: actionTypes.PURCHASE_BURGER,
		orderData, 
		token,
	};
}

export function fetchOrdersStart() {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
}

export function fetchOrdersSuccess(orders) {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders,
	};
}
export function fetchOrdersFail(error) {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error,
	};
}

export function fetchOrders(token, userId) {
	// return dispatch => {
	// 	dispatch(fetchOrdersStart());
	// 	const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
	// 	axios.get('/orders.json' + queryParams)
	// 		.then(response => {
	// 			console.log(response.data);
	// 			const fetchedOrders = [];
	// 			for (const key in response.data) {
	// 				fetchedOrders.push({ id: key, ...response.data[key] });

	// 			}
	// 			dispatch(fetchOrdersSuccess(fetchedOrders));
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 			dispatch(fetchOrdersFail(error));

	// 		})
	// };
	return {
		type: actionTypes.FETCH_ORDERS,
		token, 
		userId
	};
}
