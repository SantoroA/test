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
				isFirstTimeUser: action.payload.isFirstTimeUser,
				preferredLanguage: action.payload.preferredLanguage,
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
	return async ({ email, amIHCP, preferredLanguage, subdomain }) => {
		dispatch({ type: 'open_dialog' });
		try {
			const response = await dianurseApi.post('/account/register', {
				email,
				amIHCP,
				password: 'Teste1234_',
				preferredLanguage,
				subdomain
			});

			console.log(response);

			dispatch({ type: 'set_dialog_message', payload: response.data });
		} catch (err) {
			console.log(err.message);
			dispatch({ type: 'add_error', payload: err.message });
		}
	};
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

//SOCIAL MEDIA LOGIN AND REGISTER

const handleFacebookLogin = (dispatch) => async (fbResponse) => {
	console.log(fbResponse);

	try {
		const response = await dianurseApi.post('/account/auth/socialmedia', {
			email: fbResponse.email,
			id: fbResponse.id
		});
		console.log(response);
		// dispatch({ type: 'login', payload: response.data.token });
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

const handleFacebookRegister = (dispatch) => async ({ fbResponse, language, subdomain }) => {
	console.log(fbResponse, language);
	try {
		const response = await dianurseApi.post('/account/auth/socialmedia/register', {
			username: fbResponse.name,
			id: fbResponse.id,
			email: fbResponse.email,
			picture: fbResponse.picture.data.url,
			preferredLanguage: language,
			subdomain,
			type: 'facebook'
		});
		console.log(response);
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

const handleGoogleLogin = (dispatch) => async (ggResponse) => {
	console.log(ggResponse);

	try {
		const response = await dianurseApi.post('/account/auth/socialmedia', {
			email: ggResponse.profileObj.email,
			id: ggResponse.googleId
		});
		console.log(response);
		// dispatch({ type: 'login', payload: response.data.token });
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

const handleGoogleRegister = (dispatch) => async ({ ggResponse, language, subdomain }) => {
	console.log(ggResponse, language);
	try {
		const response = await dianurseApi.post('/account/auth/socialmedia/register', {
			username: ggResponse.profileObj.name,
			id: ggResponse.googleId,
			email: ggResponse.profileObj.email,
			picture: ggResponse.profileObj.imageUrl,
			preferredLanguage: language,
			subdomain,
			type: 'google'
		});
		console.log(response);
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

//RECOVER PASSWORD

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
	{
		login,
		signout,
		register,
		handleFacebookLogin,
		handleFacebookRegister,
		handleGoogleLogin,
		handleGoogleRegister,
		recoverPassword,
		closeDialog
	},
	{
		useName: '',
		userId: '',
		userToken: '',
		userAmIHCP: true,
		errorMessage: '',
		dialogMessage: '',
		dialogOpen: false,
		isLoggedIn: true,
		isFirstTimeUser: true,
		preferredLanguage: 'en-US'
	}
);
