import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'set_dialog_message':
			return { ...state, dialogMessage: action.payload, messageDialogOpen: true };
		case 'close_dialog':
			return { ...state, dialogMessage: '', messageDialogOpen: false };
		case 'login':
			return { ...state, token: action.payload, errorMessage: '' };
		case 'add_error':
			return { ...state, dialogMessage: action.payload, messageDialogOpen: true };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		case 'signout':
			return { token: null, errorMessage: '' };
		default:
			return state;
	}
};

//only if the token lasts for a while:

// const tryLocallogin = (dispatch) => async () => {
// 	const token = await localStorage.getItem('token');
// 	const history = useHistory();
// 	if (token) {
// 		dispatch({ type: 'login', payload: token });
// 	} else {
// 		history.push('/');
// 		console.log('you must sign in ');
// 	}
// };

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

const register = (dispatch) => {
	return async ({ email, amIHCP, preferredLang }) => {
		try {
			const response = await dianurseApi.post('/account/register', {
				email,
				amIHCP,
				password: 'Teste1234_',
				preferredLang
			});

			console.log(response);

			dispatch({ type: 'set_dialog_message', payload: response.data });
		} catch (err) {
			console.log(err.message);
			dispatch({ type: 'add_error', payload: err.message });
		}
	};
};

const handleFacebookLogin = (dispatch) => async (accessToken) => {
	console.log(accessToken);
	try {
		const response = await dianurseApi.post('/account/auth/facebook', accessToken);
		console.log(response);
		dispatch({ type: 'login', payload: response.data.token });
	} catch (err) {
		console.log('error');
	}
};

const login = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await dianurseApi.post('/account/login', {
				email,
				password
			});
			console.log(response);

			//TODO: how to encript? (ex: keychain)
			const user = {
				amIHCP: response.data.amIHCP,
				token: response.data.token,
				userId: response.data.userId
			};
			// console.log(user);
			// await localStorage.setItem('user', JSON.stringify(user));
			dispatch({ type: 'login', payload: response.data.token });
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: err.message
			});
		}
	};
};

const signout = (dispatch) => async () => {
	await localStorage.removeItem('token');
	dispatch({ type: 'signout' });
};

const recoverPassword = (dispatch) => async ({ email }) => {
	try {
		const response = await dianurseApi.post('/account/passwordrecovery', { email });
		dispatch({ type: 'set_dialog_message', payload: response.data });
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

const closeDialog = (dispatch) => () => {
	dispatch({ type: 'close_dialog' });
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ login, signout, register, handleFacebookLogin, clearErrorMessage, recoverPassword, closeDialog },
	{ token: null, errorMessage: '', dialogMessage: '', messageDialogOpen: false }
);
