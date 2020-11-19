import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'set_dialog_message':
			return { ...state, dialogMessage: action.payload, dialogOpen: true };
		case 'close_dialog':
			return { ...state, dialogMessage: '', dialogOpen: false };
		case 'login':
			return {
				...state,
				userName: action.payload.user,
				userId: action.payload.userId,
				userToken: action.payload.token,
				userAmIHCP: action.payload.amIHCP,
				// loginData: action.payload,
				isLoggedIn: true,
				dialogMessage: '',
				dialogOpen: false
			};
		case 'fb_login':
			return {
				...state,
				userName: action.payload.name,
				userId: action.payload.id,
				userToken: action.payload.accessToken,
				// userAmIHCP: action.payload.amIHCP,
				isLoggedIn: true,
				dialogMessage: '',
				dialogOpen: false
			};
		case 'gg_login':
			return {
				...state,
				userName: action.payload.profileObj.name,
				userId: action.payload.googleId,
				userToken: action.payload.accessToken,
				// userAmIHCP: action.payload.amIHCP,
				isLoggedIn: true,
				dialogMessage: '',
				dialogOpen: false
			};
		case 'add_error':
			return { ...state, dialogMessage: action.payload, dialogOpen: true };
		case 'signout':
			return { loginData: null, dialogMessage: '', isLoggedIn: false };
		case 'open_dialog':
			return { ...state, dialogOpen: true };
		default:
			return state;
	}
};

//TODO: get from cookies

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

const register = (dispatch) => {
	return async ({ email, amIHCP, preferredLang }) => {
		dispatch({ type: 'open_dialog' });
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

const handleFacebookLogin = (dispatch) => async (fbResponse) => {
	console.log(fbResponse);

	dispatch({ type: 'fb_login', payload: fbResponse });
	// try {
	// 	const response = await dianurseApi.post('/account/auth/facebook', accessToken);
	// 	console.log(response);
	// 	dispatch({ type: 'login', payload: response.data.token });
	// } catch (err) {
	// 	dispatch({
	// 		type: 'add_error',
	// 		payload: err.message
	// 	});
	// }
};

const handleGoogleLogin = (dispatch) => (ggResponse) => {
	console.log(ggResponse);
	dispatch({ type: 'gg_login', payload: ggResponse });
};

const login = (dispatch) => {
	return async ({ email, password }) => {
		dispatch({ type: 'open_dialog' });
		try {
			const response = await dianurseApi.post('/account/login', {
				email,
				password
			});
			console.log(response);

			//TODO: store in COOKIES
			// const user = {
			// 	amIHCP: response.data.amIHCP,
			// 	token: response.data.token,
			// 	userId: response.data.userId,
			// 	user: response.data.user
			// };

			dispatch({ type: 'login', payload: response.data });
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
	dispatch({ type: 'open_dialog' });
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
	{ login, signout, register, handleFacebookLogin, handleGoogleLogin, recoverPassword, closeDialog },
	{
		useName: '',
		userId: '',
		userToken: '',
		userAmIHCP: '',
		errorMessage: '',
		dialogMessage: '',
		dialogOpen: false,
		isLoggedIn: false
	}
);
