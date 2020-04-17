import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from "../../../axios-order";
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';


function ContactData(props) {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code',
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your Email',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' },
				]
			},
			value: 'cheapest',
			validation: {},
			valid: true,
		},
	});
	const [isFormValid, setIsFormValid] = useState(false)


	const orderHandler = (event) => {
		event.preventDefault();
		const formDataValues = {};
		for (const element in orderForm) {
			formDataValues[element] = orderForm[element].value;
		}

		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formDataValues,
			userId: props.userId,
		}
		props.orderBurgerHandler(order, props.token);

	}

	const inputChangeHandler = (event, identifier) => {
		const newOrderForm = { ...orderForm };
		const newOrderFormElement = { ...newOrderForm[identifier] }
		newOrderFormElement.value = event.target.value;
		newOrderFormElement.valid = checkValidity(newOrderFormElement.value, newOrderFormElement.validation);
		newOrderFormElement.touched = true;
		let isFormValid = true;
		for (const element in newOrderForm) {
			isFormValid = newOrderForm[element].valid && isFormValid;
		}

		newOrderForm[identifier] = newOrderFormElement;
		setOrderForm(newOrderForm);
		setIsFormValid(isFormValid);

	}

	const formElementArray = [];
	for (const key in orderForm) {
		formElementArray.push({
			id: key,
			config: orderForm[key]
		});

	}

	let form = (
		<form onSubmit={orderHandler}>
			{formElementArray.map(element => (
				<Input
					key={element.id}
					elementType={element.config.elementType}
					elementConfig={element.config.elementConfig}
					value={element.config.value}
					invalid={!element.config.valid}
					touched={element.config.touched}
					changeHandler={(event) => inputChangeHandler(event, element.id)}
				/>
			))}
			<Button btnType="Success" disabled={!isFormValid}>
				ORDER
				</Button>
		</form>
	);

	if (props.loading) {
		form = <Spinner />;
	}

	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data:</h4>
			{form}
		</div>
	)
}



const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		orderBurgerHandler: (orderData, token) => { dispatch(actions.purchaseBurger(orderData, token)) },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
//export default connect(mapStateToProps,mapDispatchToProps)(ContactData);