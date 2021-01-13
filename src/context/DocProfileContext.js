import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const docProfileReducer = (state, action) => {
	switch (action.type) {
		case 'get_profile':
			return {
				...state,
				slots: action.payload
			};
		case 'get_speciality':
			return {
				...state,
				allSpecialty: action.payload
			}
		case 'update_services':
			return {
				...state,
				services: action.payload
			};
		case 'update_contact_info':
			return {
				...state,
				specialty: action.payload.specialty,
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
				websiteUrl: action.payload.websiteUrl,
				insurance: action.payload.insurance
			};
		case 'update_location_info':
			return {
				...state,
				country: action.payload.country,
				city: action.payload.city,
				zipcode: action.payload.zipcode,
				street: action.payload.street,
				num: action.payload.num
			};
		case 'update_education':
			return {
				...state,
				education: action.payload.education
			};
		case 'update_experience':
			return {
				...state,
				yearsExperience: action.payload.yearsExperience,
				yearsSpecialist: action.payload.yearsSpecialist
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

const getSpeciality = (dispatch) => {
	return async () => {
		try {
			const response = await dianurseApi.get('/profile/doctor/getspeciality');
			console.log(response);
			dispatch({ type: 'get_speciality', payload: response.data });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
}

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
	return async ({ id, firstName, lastName, gender, phoneNumber, birthPlace, birthday, specialty }) => {
		console.log('inside context', firstName, lastName);
		let userInfo = {
			id,
			firstName,
			lastName,
			specialty,
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
					specialty,
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
	return async ({ profileInfo, websiteUrl, id, insurance }) => {
		let userInfo = {
			id,
			profileInfo,
			websiteUrl,
			insurance,
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
					insurance,
					websiteUrl
				}
			});
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};
const updateLocationInfo = (dispatch) => {
	return async ({ id, country, city, zipcode, street, num }) => {
		let userInfo = {
			id,
			country,
			city,
			zipcode,
			street,
			num,
			form: 9
		};
		console.log('inside location info context', country);
		try {
			// const response = await dianurseApi.put('/profile/doctor/completeprofile', {
			// 	userInfo
			// });
			// console.log(response);
			dispatch({
				type: 'update_location_info',
				payload: {
					country,
					city,
					zipcode,
					street,
					num
				}
			});
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};
const updateEducation = (dispatch) => {
	return async ({ id, education }) => {
		let userInfo = {
			id,
			education,
			form: 8
		};
		console.log('inside education context', education);
		try {
			// const response = await dianurseApi.put('/profile/doctor/completeprofile', {
			// 	userInfo
			// });
			// console.log(response);
			dispatch({
				type: 'update_education',
				payload: {
					education
				}
			});
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};
const updateExperience = (dispatch) => {
	return async ({ id, yearsExperience, yearsSpecialist }) => {
		let userInfo = {
			id,
			yearsExperience,
			yearsSpecialist,
			form: 7
		};
		console.log('inside experience context', yearsExperience);
		try {
			// const response = await dianurseApi.put('/profile/doctor/completeprofile', {
			// 	userInfo
			// });
			// console.log(response);
			dispatch({
				type: 'update_experience',
				payload: {
					yearsExperience,
					yearsSpecialist
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
	{
		getSpeciality,
		getProfile,
		updateServices,
		updateContactInfo,
		updateProfileInfo,
		updateEducation,
		updateLocationInfo,
		updateExperience,
		closeDialog,
	},
	{
		services: [],
		specialty: '',
		insurance: '',
		dialogMessage: '',
		dialogOpen: false,
		firstName: '',
		lastName: '',
		gender: '',
		phoneNumber: '',
		birthPlace: '',
		birthday: '',
		profileInfo: '',
		websiteUrl: '',
		country: '',
		city: '',
		zipcode: '',
		street: '',
		num: '',
		education: '',
		yearsExperience: '',
		yearsSpecialist: ''
	}
);
