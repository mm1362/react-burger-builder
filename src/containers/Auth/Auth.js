import React, { Component } from 'react'
import Input from '../../components/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';


class Auth extends Component {
	state = {
		controls: {
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
		},
		isSignup: true,
	}
	componentDidMount() {
		if (!this.props.building && this.props.authRedirectPat !== '/')
			this.props.setAuthRedirectPathHandler();
	}

	checkValidity(value, rules) {
		if (!rules) return true;

		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if (rules.minLength) {
			isValid = value.trim().length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.trim().length <= rules.minLength && isValid;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid
		}
		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}
		return isValid;
	}

	inputChangeHandler = (event, identifier) => {
		const newControls = {
			...this.state.controls,
			[identifier]: {
				...this.state.controls[identifier],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[identifier].validation),
				touched: true,
			}
		};
		this.setState({ controls: newControls })
	}

	submitHandler = (event) => {
		console.log('submitHandler');

		event.preventDefault();
		this.props.authHandler(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	}

	switchAuthHandler = () => {
		this.setState(state => ({ isSignup: !state.isSignup }));
	}

	render() {
		const formElementArray = [];
		for (const key in this.state.controls) {
			formElementArray.push({
				id: key,
				config: this.state.controls[key]
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
				changeHandler={(event) => this.inputChangeHandler(event, element.id)}
			/>
		))

		if (this.props.loading) {
			form = <Spinner />
		};

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			)
		};

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		};

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success" > {this.state.isSignup ? "SignUp" : "SignIn"}</Button>
				</form>
				<Button btnType="Danger" type="button" clickHandler={this.switchAuthHandler}>Switch to {this.state.isSignup ? "SignIn" : "SignUp"}</Button>
			</div>
		)
	}
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