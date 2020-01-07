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

export function purchaseBurger(orderData) {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json', orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				console.log(error)
				dispatch(purchaseBurgerSuccess(error));
			});
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

export function fetchOrders() {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json')
			.then(response => {
				//console.log(response.data);
				const fetchedOrders = [];
				for (const key in response.data) {
					fetchedOrders.push({ id: key, ...response.data[key] });

				}
				//this.setState({ loading: false, orders: fetchedOrders })
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(error => {
				console.log(error);
				fetchOrdersFail(error)

			})
	};
}
