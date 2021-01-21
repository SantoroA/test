import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const patProfileReducer = (state, action) => {
	switch (action.type) {
		case 'get_profile':
			return {
				...state,
				dialogMessage: '',
				dialogOpen: false,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				gender: action.payload.gender,
				phoneNumber: action.payload.phoneNumber,
				birthPlace: action.payload.birthPlace,
				birthday: action.payload.birthday,
				email: action.payload[0].accountId.username,
				image: action.payload[0].accountId.profilePicture
			};

		case 'update_contact_info':
			return {
				...state,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				gender: action.payload.gender,
				phoneNumber: action.payload.phoneNumber,
				birthday: action.payload.birthday,
				birthPlace: action.payload.birthPlace
			};
		case 'add_error':
			return { ...state, dialogMessage: action.payload, dialogOpen: true };
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

const getPatProfile = (dispatch) => {
	return async (id) => {
		try {
			const response = await dianurseApi.get('/profile/patient/getprofile', {
				params: { id }
			});
			console.log(response.data);
			dispatch({ type: 'get_profile', payload: response.data });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};

const updateContactInfo = (dispatch) => {
	return async ({ id, firstName, lastName, gender, phoneNumber, birthPlace, birthday, specialty }) => {
		console.log('inside context', firstName, lastName, specialty);
		let userInfo = {
			id,
			firstName,
			lastName,
			gender,
			phoneNumber,
			birthPlace,
			birthday,
			form: 3
		};

		try {
			const response = await dianurseApi.put('/profile/doctor/completeprofile', {
				userInfo
			});
			console.log(response);
			dispatch({
				type: 'update_contact_info',
				payload: {
					firstName,
					lastName,
					gender,
					phoneNumber,
					birthPlace,
					birthday
				}
			});
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};

//DIALOG
const closeDialog = (dispatch) => () => {
	dispatch({ type: 'close_dialog' });
};

export const { Context, Provider } = createDataContext(
	patProfileReducer,
	{
		getPatProfile,
		updateContactInfo,
		closeDialog
	},
	{
		email: 'patient@test.com',
		image:
			'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',

		dialogMessage: '',
		dialogOpen: false,
		firstName: 'Rachel',
		lastName: 'Green',
		gender: '',
		phoneNumber: '',
		birthPlace: '',
		birthday: ''
	}
);