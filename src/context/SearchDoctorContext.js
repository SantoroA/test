import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const searchDoctorReducer = (state, action) => {
	switch (action.type) {
		case 'get_doctor_list':
			return {
				...state,
				doctors: action.payload
			};
		case 'save_date':
			return {
				...state,
				formatDate: action.payload
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

const getDoctorList = (dispatch) => {
	return async ({ typeOfHCP, date }) => {
		const search = {
			typeOfHCP,
			date
		};
		try {
			const response = await dianurseApi.get('/appointment/searchAppointment', {
				params: search
			});
			console.log(response.data);
			dispatch({ type: 'get_doctor_list', payload: response.data });
			let dateChoose = new Date(date).toDateString().split(' ');
			let formatDate = `${dateChoose[0]}, ${dateChoose[2]} ${new Date(date).toLocaleString('default', {
				month: 'long'
			})}`;
			dispatch({ type: 'save_date', payload: formatDate });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
		}
	};
};

const reserve = (dispatch) => {
	return async ({ patientId, appointmentId }) => {
		try {
			const response = await dianurseApi.post(`/appointment/addAppointment/${patientId}`, {
				appointmentId
			});
			console.log(response.data);
			dispatch({ type: 'set_dialog_message', payload: response.data });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
		}
	};
};

//DIALOG
const closeDialog = (dispatch) => () => {
	dispatch({ type: 'close_dialog' });
};

export const { Context, Provider } = createDataContext(
	searchDoctorReducer,
	{ getDoctorList, closeDialog, reserve },
	{
		formatDate: '',
		doctors: [
			{
				accountHCPid: {
					profilePicture:
						'https://images.pexels.com/photos/3881247/pexels-photo-3881247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',

					price: {
						currency: '$'
					}
				},
				profileHCPid: {
					rating: {
						averageRating: 5,
						receivedRating: 20
					},
					firstName: 'Princess Consuela',
					lastName: 'Banana Hammock',
					description: 'Phoebe Buffet'
				},
				amount: '76.25',
				_id: '6532654236543',
				appointmentTimeStart: '',
				appointmentTimeEnd: ''
			}
		],
		dialogMessage: '',
		dialogOpen: false,
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
