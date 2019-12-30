import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

export default function withErrorHandler(WrappedComponent, axios) {
	return class extends Component {
		state = {
			error: null
		}
		constructor() {
			super();
			this.reqInterceptor = axios.interceptors.request.use(request => {
				this.setState({ error: null })
				return request;
			})

			this.resInterceptor = axios.interceptors.response.use(response => response, error => {
				console.log(error);
				this.setState(	{ error: error })
			})
		}
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)

		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		render() {
			return (
				<React.Fragment>
					<Modal
						show={this.state.error}
						backdropClickHandler={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			)
		}
	}
}