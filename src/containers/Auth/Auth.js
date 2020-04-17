import React, { useState, useEffect } from 'react'
import Input from '../../components/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';


function Auth(props) {
	const [authForm, setAuthForm] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Mail Address',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password',
			},
			value: '',
			validation: {
				required: true,
				minLength: 6,
			},
			valid: false,
			touched: false,
		},
	});
	const [isSignup, setIsSignup] = useState(true);

	useEffect(() => {
		if (!props.building && props.authRedirectPat !== '/')
			props.setAuthRedirectPathHandler();

	}, []);


	const inputChangeHandler = (event, identifier) => {
		const newControls = {
			...authForm,
			[identifier]: {
				...authForm[identifier],
				value: event.target.value,
				valid: checkValidity(event.target.value, authForm[identifier].validation),
				touched: true,
			}
		};
		setAuthForm(newControls)
	}

	const submitHandler = (event) => {
		console.log('submitHandler');

		event.preventDefault();
		props.authHandler(authForm.email.value, authForm.password.value, isSignup);
	}

	const switchAuthHandler = () => {
		setIsSignup(state => !state);
	}

	const formElementArray = [];
	for (const key in authForm) {
		formElementArray.push({
			id: key,
			config: authForm[key]
		});
	}
	let form = formElementArray.map(element => (
		<Input
			key={element.id}
			elementType={element.config.elementType}
			elementConfig={element.config.elementConfig}
			value={element.config.value}
			invalid={!element.config.valid}
			// shouldValidate={element.config.validation}
			touched={element.config.touched}
			changeHandler={(event) => inputChangeHandler(event, element.id)}
		/>
	))

	if (props.loading) {
		form = <Spinner />
	};

	let errorMessage = null;
	if (props.error) {
		errorMessage = (
			<p>{props.error.message}</p>
		)
	};

	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />
	};

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType="Success" > {isSignup ? "SignUp" : "SignIn"}</Button>
			</form>
			<Button btnType="Danger" type="button" clickHandler={switchAuthHandler}>Switch to {isSignup ? "SignIn" : "SignUp"}</Button>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authHandler: (email, password, isSignup) => { dispatch(actions.auth(email, password, isSignup)) },
		setAuthRedirectPathHandler: () => { dispatch(actions.setAuthRedirectPath('/')) },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);