import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const authReducer = (state, action) => {
	switch (action.type) {
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
		case 'logout':
			return {
				...state,
				userName: '',
				userId: '',
				userToken: '',
				userAmIHCP: '',
				isFirstTimeUser: '',
				preferredLanguage: '',
				isLoggedIn: false,
				dialogMessage: '',
				dialogOpen: false
			};
		case 'set_dialog_message':
			return { ...state, dialogMessage: action.payload, dialogOpen: true };
		case 'open_dialog':
			return { ...state, dialogOpen: true };
		case 'close_dialog':
			return { ...state, dialogMessage: '', dialogOpen: false };
		default:
			return state;
	}
};

// COOKIE

const getCookie = (dispatch) => {
	return async () => {
		try {
			const response = await dianurseApi.get('/account/getcookie', {
				withCredentials: true
			});
			console.log(response);
			dispatch({ type: 'login', payload: response.data });
		} catch (err) {
			console.log(err.message);
		}
	};
};

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
			console.log(response, response.data.token);
			const cookieResponse = await dianurseApi.get('/account/savecookie', {
				headers: {
					token: response.data.token
				},
				withCredentials: true
			});
			console.log(cookieResponse);
			dispatch({ type: 'login', payload: response.data });
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: err.message
			});
		}
	};
};

const logout = (dispatch) => {
	return async () => {
		try {
			const response = await dianurseApi.get('/account/logout', {
				withCredentials: true
			});
			console.log(response);

			dispatch({ type: 'logout' });
		} catch (err) {
			console.log(err.message);
			dispatch({ type: 'add_error', payload: err.message });
		}
	};
};

//SOCIAL MEDIA LOGIN AND REGISTER

//FACEBOOK

const handleFacebookLogin = (dispatch) => async (fbResponse) => {
	console.log(fbResponse);

	try {
		const response = await dianurseApi.post('/account/auth/socialmedia', {
			email: fbResponse.email,
			id: fbResponse.id
		});
		console.log(response);
		const cookieResponse = await dianurseApi.get('/account/savecookie', {
			headers: {
				token: response.data.token
			},
			withCredentials: true
		});
		console.log(cookieResponse);
		dispatch({ type: 'login', payload: response.data });
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
			//get element zero
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

//APPLE

const handleAppleLogin = (dispatch) => async (appleResponse) => {
	console.log(appleResponse);

	try {
		const response = await dianurseApi.post('/account/auth/socialmedia', {
			email: appleResponse.user.email[0],
			id: appleResponse.authorization.id_token
		});
		console.log(response);
		const cookieResponse = await dianurseApi.get('/account/savecookie', {
			headers: {
				token: response.data.token
			},
			withCredentials: true
		});
		console.log(cookieResponse);
		dispatch({ type: 'login', payload: response.data });
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

const handleAppleRegister = (dispatch) => async ({ appleResponse, language, subdomain }) => {
	console.log(appleResponse, language);
	try {
		const response = await dianurseApi.post('/account/auth/socialmedia/register', {
			username: `${appleResponse.user.name.firstName} ${appleResponse.user.name.lastName}`,
			id: appleResponse.authorization.id_token,
			//get element zero
			email: appleResponse.user.email,
			// picture: appleResponse.picture.data.url,
			preferredLanguage: language,
			subdomain,
			type: 'apple'
		});
		console.log(response);
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: err.message
		});
	}
};

//GOOGLE

const handleGoogleLogin = (dispatch) => async (ggResponse) => {
	console.log(ggResponse);

	try {
		const response = await dianurseApi.post('/account/auth/socialmedia', {
			email: ggResponse.profileObj.email,
			id: ggResponse.googleId
		});
		console.log(response);
		const cookieResponse = await dianurseApi.get('/account/savecookie', {
			headers: {
				token: response.data.token
			},
			withCredentials: true
		});
		console.log(cookieResponse);
		dispatch({ type: 'login', payload: response.data });
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

const changePassword = (dispatch) => async ({ newPassword, newPasswordMatch, recToken }) => {
	console.log(newPassword, newPasswordMatch, recToken);
	try {
		const response = await dianurseApi.post(`/account/passwordrecovery/${recToken}`, {
			newPassword,
			newPasswordMatch
		});
		dispatch({ type: 'set_dialog_message', payload: response.data.message });
	} catch (err) {
		dispatch({
			type: 'add_error',
			payload: 'Ops, something went wrong. Please try again later.'
			//error of type 502 ex
		});
	}
};

// DIALOG

const closeDialog = (dispatch) => () => {
	dispatch({ type: 'close_dialog' });
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{
		login,
		logout,
		register,
		getCookie,
		handleFacebookLogin,
		handleFacebookRegister,
		handleGoogleLogin,
		handleGoogleRegister,
		handleAppleLogin,
		handleAppleRegister,
		recoverPassword,
		closeDialog,
		changePassword
	},
	{
		useName: '',
		userId: '',
		userToken: '',
		userAmIHCP: false,
		errorMessage: '',
		dialogMessage: '',
		dialogOpen: false,
		isLoggedIn: false,
		isFirstTimeUser: false,
		preferredLanguage: 'en-US'
	}
);
