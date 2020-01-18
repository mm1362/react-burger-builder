import * as actionTypes from "../actions/actionsTypes";
import reducer from "./auth";

const initialStat = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}
describe("Auth Reducer", () => {
	it("should return initial state", () => {
		expect(reducer(undefined, {})).toEqual(initialStat);
	});
	it("should store token upon login", () => {
		expect(reducer(initialStat, {
			type: actionTypes.AUTH_SUCCESS,
			idToken: 'some-token',
			userId: 'some-userId',
		})).toEqual({
			...initialStat,
			token: 'some-token',
			userId: 'some-userId',
		});
	});
});
