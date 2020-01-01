import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// import Spinner from '../../components/UI/Spinner/Spinner'


class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	}
	componentDidMount() {
		axios.get('/orders.json')
			.then(response => {
				//console.log(response.data);
				const fetchedOrders = [];
				for (const key in response.data) {
					fetchedOrders.push({ id: key, ...response.data[key] });

				}
				this.setState({ loading: false, orders: fetchedOrders })
			})
			.catch(error => {
				console.log(error);

			})
	}

	render() {
		// let orders = <Spinner />
		// if (!this.state.loading)
		// 	orders = this.state.orders.map(order => <Order key={order.id} {...order} />);
		return (
			<div>
				{this.state.orders.map(order => <Order key={order.id} {...order} />)}
			</div>
		)
	}
}

export default withErrorHandler(Orders, axios);