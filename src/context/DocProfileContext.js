import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const docProfileReducer = (state, action) => {
	switch (action.type) {
		case 'get_profile':
			return {
				...state,
				slots: action.payload
			};
		case 'update_services':
			return {
				...state,
				services: action.payload
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
		case 'update_profile_info':
			return {
				...state,
				profileInfo: action.payload.profileInfo,
				websiteUrl: action.payload.websiteUrl
			};
		case 'set_is_editing':
			return {
				...state,
				slots: state.slots.map(
					(slot) => (slot.slotCreated === action.payload ? { ...slot, isEditing: !slot.isEditing } : slot)
				)
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

const getProfile = (dispatch) => {
	return async (id) => {
		try {
			const response = await dianurseApi.get('/profile/doctor/getprofile', {
				params: { id }
			});
			console.log(response);
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};

const updateServices = (dispatch) => {
	return async ({ services, id }) => {
		let userInfo = {
			id,
			services,
			form: 5
		};

		try {
			// const response = await dianurseApi.put('/profile/doctor/completeprofile', {
			// 	userInfo
			// });
			// console.log(response);
			dispatch({ type: 'update_services', payload: services });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};
const updateContactInfo = (dispatch) => {
	return async ({ id, firstName, lastName, gender, phoneNumber, birthPlace, birthday }) => {
		console.log('inside context', firstName, lastName);
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
			// const response = await dianurseApi.put('/profile/doctor/completeprofile', {
			// 	userInfo
			// });
			// console.log(response);
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
const updateProfileInfo = (dispatch) => {
	return async ({ profileInfo, websiteUrl }) => {
		let userInfo = {
			id: '5fe8b0c48bef090026e253b7',
			profileInfo,
			websiteUrl,
			form: 6
		};
		console.log('inside profile info context', profileInfo);
		try {
			// const response = await dianurseApi.put('/profile/doctor/completeprofile', {
			// 	userInfo
			// });
			// console.log(response);
			dispatch({
				type: 'update_profile_info',
				payload: {
					profileInfo,
					websiteUrl
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
	docProfileReducer,
	{ getProfile, updateServices, updateContactInfo, updateProfileInfo, closeDialog },
	{
		services: [],
		dialogMessage: '',
		dialogOpen: false,
		firstName: '',
		lastName: '',
		gender: '',
		phoneNumber: '',
		birthPlace: '',
		birthday: '',
		profileInfo: '',
		websiteUrl: ''
	}
);
