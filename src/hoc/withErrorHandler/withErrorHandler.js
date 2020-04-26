import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

export default function withErrorHandler(WrappedComponent, axios) {
	return function (props) {
		const [error, errorConfirmedHandler] = useHttpErrorHandler(axios)
		
		// const [error, setError] = useState(null)
		// const reqInterceptor = axios.interceptors.request.use(request => {
		// 	setError(null);
		// 	return request;
		// })
		// const resInterceptor = axios.interceptors.response.use(response => response, err => {
		// 	console.log(err);
		// 	setError(err);
		// })
		// useEffect(() => {
		// 	return () => {
		// 		axios.interceptors.request.eject(reqInterceptor)
		// 		axios.interceptors.response.eject(resInterceptor)
		// 	}
		// }, [reqInterceptor, resInterceptor])
		// const errorConfirmedHandler = () => {
		// 	setError(null);
		// }

		return (
			<React.Fragment>
				<Modal
					show={error}
					backdropClickHandler={errorConfirmedHandler}
				>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</React.Fragment>
		)
	}
}

