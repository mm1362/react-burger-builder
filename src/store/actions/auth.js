import * as actionTypes from "../actions/actionsTypes";
import axios from "axios";

function authStart() {
	return {
		type: actionTypes.AUTH_START,
	};
}
function authSuccess(idToken, userId) {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		userId,
	};
}
function authFail(error) {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	};
}

export function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expirationDate');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
}

function checkoutAuthTimeout(expirationTime) {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
}

export function auth(email, password, isSignup = true) {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true,
		}
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgavDvbXyQEHJOspvJSev13FN5XdRV4b0'
		if (!isSignup) url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgavDvbXyQEHJOspvJSev13FN5XdRV4b0'
		axios.post(url, authData)
			.then(response => {
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('expirationDate', expirationDate);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkoutAuthTimeout(response.data.expiresIn))
			})
			.catch(error => {
				console.log(error.response)
				dispatch(authFail(error.response.data.error));
			});
	};
}

export function setAuthRedirectPath(path) {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path,
	};
}


export function authCheckState() {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token)
			dispatch(logout());
		else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkoutAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
}