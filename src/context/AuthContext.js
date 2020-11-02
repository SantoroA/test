import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';
// import { useHistory } from 'react-router-dom';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'signin':
			return { token: action.payload, errorMessage: '' };
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
		default:
			return state;
	}
};

//only if the token lasts for a while:

// const tryLocalSignin = (dispatch) => async () => {
// 	const token = await localStorage.getItem('token');
// 	const history = useHistory();
// 	if (token) {
// 		dispatch({ type: 'signin', payload: token });
// 	} else {
// 		history.push('/');
// 		console.log('you must sign in ');
// 	}
// };

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => {
	return async ({ name, email, password }) => {
		try {
			const response = await dianurseApi.post('/account/register', {
				name,
				email,
				password
			});

			//TODO: encript decript sensitive data
			//save userID in local storage and say whether you are a doctor or not (amIHCP)

			await localStorage.setItem('token', response.data.token);
			dispatch({ type: 'signin', payload: response.data.token });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
		}
	};
};

const signin = (dispatch) => async ({ email, password }) => {
	try {
		const response = await dianurseApi.post('/signin', {
			email,
			password
		});
		await localStorage.setItem('token', response.data.token);
		dispatch({ type: 'signin', payload: response.data.token });
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

const signout = (dispatch) => async () => {
	await localStorage.removeItem('token');
	dispatch({ type: 'signout' });
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage },
	{ token: null, errorMessage: '' }
);
