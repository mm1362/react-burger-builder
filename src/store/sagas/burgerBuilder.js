import { put } from 'redux-saga/effects'
import * as actions from '../actions';
import axios from '../../axios-order';

export function* initIngredientsSaga() {
	try {
		const response = yield axios.get("/ingredients.json")
		yield put(actions.setIngredients(response.data));

	} catch (error) {
		console.log(error);
		yield put(actions.fetchIngredientsFailed());
	}
}




