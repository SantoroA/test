import createDataContext from './createDataContext';
import { formatFormDate } from '../helpers/dateHelper';
import dianurseApi from '../api/dianurseApi';

const patProfileReducer = (state, action) => {
	switch (action.type) {
		case 'get_profile':
			console.log('patient', action.payload)
			return {
				...state,
				isFirstTimeUser: action.payload.isFirstTimeUser,
				dialogMessage: '',
				dialogOpen: false,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				gender: action.payload.gender,
				phoneNumber: action.payload.phoneNumber,
				birthPlace: action.payload.birthPlace,
				birthday: action.payload.birthday,
				email: action.payload.email,
				image: action.payload.image
			};

		case 'update_contact_info':
			return {
				...state,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				gender: action.payload.gender,
				phoneNumber: action.payload.phoneNumber,
				birthday: action.payload.birthday,
				birthPlace: action.payload.birthPlace,
				isFirstTimeUser: action.payload.isFirstTimeUser,
				
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
		console.log(id);
		try {
			const response = await dianurseApi.get(`/profile/patient/getprofile/${id}`, {
				withCredentials: true
			});
			console.log('patient', response.data[0]);
			dispatch({
				type: 'get_profile',
				payload: {
					firstName: response.data[0].firstName,
					lastName: response.data[0].lastName,
					gender: response.data[0].gender,
					phoneNumber: response.data[0].phoneNumber,
					birthPlace: response.data[0].birthPlace,
					birthday: formatFormDate(new Date(response.data[0].birthday)),
					email: response.data[0].accountId.username,
					isFirstTimeUser: response.data[0].accountId.isFirstTimeUser,
					image: response.data[0].accountId.profilePicture
				}
			});
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};

const updateContactInfo = (dispatch) => {
	return async ({ id, firstName, lastName, gender, phoneNumber, birthPlace, birthday }) => {
		console.log('inside context', firstName, lastName, birthPlace, birthday);
		let userInfo = {
			firstName,
			lastName,
			gender,
			phoneNumber,
			birthPlace,
			birthday,
			form: 3
		};

		try {
			const response = await dianurseApi.put(`/profile/patient/completeprofile/${id}`, {
				userInfo,
				withCredentials: true
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
					birthday,
					isFirstTimeUser: false
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
		// email: '',
		image:
			'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		// email: 'patient@test.com',
		email:'',
		// image: '',
		dialogMessage: '',
		dialogOpen: false,
		// firstName: 'Rachel',
		// lastName: 'Green',
		firstName: '',
		lastName: '',
		gender: '',
		phoneNumber: '',
		birthPlace: '',
		birthday: '',
		isFirstTimeUser: false
	}
);
