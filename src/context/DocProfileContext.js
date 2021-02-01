import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const docProfileReducer = (state, action) => {
	switch (action.type) {
		case 'get_profile':
			console.log(action.payload);
			return {
				...state,
				specialty: action.payload.typeOfHCP,
				insurance: action.payload.insurance,
				dialogMessage: '',
				dialogOpen: false,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				gender: action.payload.gender,
				phoneNumber: action.payload.phoneNumber,
				birthPlace: action.payload.birthPlace,
				birthday: action.payload.birthday,
				profileInfo: action.payload.profileInfo,
				websiteUrl: action.payload.websiteUrl,
				country: action.payload.country,
				city: action.payload.city,
				zipcode: action.payload.zipcode,
				street: action.payload.street,
				num: action.payload.num,
				education: action.payload.education,
				yearsExperience: action.payload.yearsExperience,
				yearsSpecialist: action.payload.yearsSpecialist,
				email: action.payload.email,
				image: action.payload.image
			};
		case 'get_speciality':
			return {
				...state,
				allSpecialty: action.payload
			};
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
};
const formatDate = (date) => {
	const newDate= new Date(date)
	const year = newDate.getFullYear();
	const month = '' + newDate.getMonth() + 1;
	let day = '' + newDate.getDate();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	return [ year, month, day ].join('-');
};
const getProfile = (dispatch) => {
	return async (id) => {
		console.log(id);
		try {
			const response = await dianurseApi.get(`/profile/doctor/getprofile/${id}`, {
				withCredentials: true
			});
			console.log(response.data);

			dispatch({
				type: 'get_profile',
				payload: {
					specialty: response.data[0].typeOfHCP,
					insurance: response.data[0].insurance,
					firstName: response.data[0].firstName,
					lastName: response.data[0].lastName,
					gender: response.data[0].gender,
					phoneNumber: response.data[0].phoneNumber,
					birthPlace: response.data[0].birthPlace,
					birthday: formatDate(response.data[0].birthday),
					profileInfo: response.data[0].profileInfo,
					websiteUrl: response.data[0].websiteUrl,
					country: response.data[0].country,
					city: response.data[0].city,
					zipcode: response.data[0].zipcode,
					street: response.data[0].street,
					num: response.data[0].number,
					education: response.data[0].education,
					yearsExperience: response.data[0].yearsExperience,
					yearsSpecialist: response.data[0].yearsSpecialist,
					email: response.data[0].accountId.username,
					image: response.data[0].accountId.profilePicture
				}
			});
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
		console.log('inside context', firstName, lastName, specialty);
		let userInfo = {
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
			const response = await dianurseApi.put(`/profile/doctor/completeprofile/${id}`, {
				userInfo,
				withCredentials: true
			});
			console.log(response);
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
		console.log(insurance);
		let userInfo = {
			profileInfo,
			websiteUrl,
			insurance,
			form: 6
		};
		console.log('inside profile info context', profileInfo);
		try {
			const response = await dianurseApi.put(`/profile/doctor/completeprofile/${id}`, {
				userInfo,
				withCredentials: true
			});
			console.log(response);
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
		console.log(zipcode);
		let userInfo = {
			country,
			city,
			zipcode,
			street,
			num,
			form: 9
		};
		console.log('inside location info context', country);
		try {
			const response = await dianurseApi.put(`/profile/doctor/completeprofile/${id}`, {
				userInfo
			});
			console.log(response);
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
			education,
			form: 8
		};
		console.log('inside education context', education);
		try {
			const response = await dianurseApi.put(`/profile/doctor/completeprofile/${id}`, {
				userInfo,
				withCredentials: true
			});
			console.log(response);
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
			yearsExperience,
			yearsSpecialist,
			form: 7
		};
		console.log('inside experience context', yearsExperience);
		try {
			const response = await dianurseApi.put(`/profile/doctor/completeprofile/${id}`, {
				userInfo,
				withCredentials: true
			});
			console.log(response);
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
		closeDialog
	},
	{
		services: [],
		email: 'doc@test.com',
		image:
			'https://images.pexels.com/photos/3846038/pexels-photo-3846038.jpeg?cs=srgb&dl=pexels-anna-shvets-3846038.jpg&fm=jpg',
		specialty: 'General care physician',
		insurance: '',
		dialogMessage: '',
		dialogOpen: false,
		firstName: 'Phoebee',
		lastName: 'Buffet',
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
		yearsSpecialist: '',
		allSpecialty: [
			'General care physician',
			'Endocrinologist',
			'Dietitian',
			'Certified diabetes educator',
			'Podiatrist',
			'Nephrologist',
			'Ophthalmologist',
			'Physical trainer',
			'Dentist',
			'Any'
		]
	}
);
