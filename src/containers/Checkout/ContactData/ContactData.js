import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from "../../../axios-order";
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Input from '../../../components/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
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
				validation:{},
				valid: true,
			},
		},
		isFormValid:false,
		loading: false,
	}


	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true })
		const formDataValues = {};
		for (const element in this.state.orderForm) {
			formDataValues[element] = this.state.orderForm[element].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			formData: formDataValues,
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false, purchasing: false });
				if (response) {
					this.props.history.push('/')
				}
			})
			.catch(error => {
				console.log(error)
				this.setState({ loading: false, purchasing: false });
			});
	}
	checkValidity(value, rules) {
		if(!rules) return true;
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
		return isValid;
	}

	inputChangeHandler = (event, identifier) => {
		const orderForm = { ...this.state.orderForm };
		const newOrderFormElement = { ...orderForm[identifier] }
		newOrderFormElement.value = event.target.value;
		newOrderFormElement.valid = this.checkValidity(newOrderFormElement.value, newOrderFormElement.validation);
		newOrderFormElement.touched = true;
		let isFormValid=true;
		for(const element in orderForm) {
				isFormValid = orderForm[element].valid && isFormValid;
			
		}

		orderForm[identifier] = newOrderFormElement;
		this.setState({ orderForm,isFormValid })

	}

	render() {
		const formElementArray = [];
		for (const key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[key]
			});

		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(element => (
					<Input
						key={element.id}
						elementType={element.config.elementType}
						elementConfig={element.config.elementConfig}
						value={element.config.value}
						invalid={!element.config.valid}
						touched={element.config.touched}
						changeHandler={(event) => this.inputChangeHandler(event, element.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.isFormValid}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data:</h4>
				{form}
			</div>
		)
	}

}
export default withErrorHandler(ContactData, axios)