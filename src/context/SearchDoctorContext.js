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
					description: 'Phoebe Buffet',
					typeOfHCP: 'Dietitian'
				},
				amount: '76.25',
				_id: '6532654236543',
				appointmentTimeStart: '2021-01-17T07:00:00.000Z',
				appointmentTimeEnd: '2021-01-17T07:30:00.000Z'
			},
			{
				accountHCPid: {
					profilePicture:
						'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvY3RvcnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',

					price: {
						currency: '$'
					}
				},
				profileHCPid: {
					rating: {
						averageRating: 9,
						receivedRating: 13
					},
					firstName: 'Gabriel',
					lastName: 'Karlo',
					description: 'Phoebe Buffet',
					typeOfHCP: 'Nephrologist'
				},
				amount: '85.00',
				_id: '6532654236544',
				appointmentTimeStart: '2021-01-20T11:00:00.000Z',
				appointmentTimeEnd: '2021-01-20T11:30:00.000Z'
			},
			{
				accountHCPid: {
					profilePicture:
						'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',

					price: {
						currency: '$'
					}
				},
				profileHCPid: {
					rating: {
						averageRating: 6,
						receivedRating: 17
					},
					firstName: 'Austin',
					lastName: 'Distel',
					description: 'Lorem',
					typeOfHCP: 'Ophthalmologist'
				},
				amount: '63.50',
				_id: '6532654236545',
				appointmentTimeStart: '2021-01-27T10:00:00.000Z',
				appointmentTimeEnd: '2021-01-27T10:30:00.000Z'
			},
			{
				accountHCPid: {
					profilePicture:
						'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',

					price: {
						currency: '$'
					}
				},
				profileHCPid: {
					rating: {
						averageRating: 10,
						receivedRating: 16
					},
					firstName: 'Bojana',
					lastName: 'Nikol',
					description: 'Mastering',
					typeOfHCP: 'Certified diabetes educator'
				},
				amount: '76.25',
				_id: '6532654236547',
				appointmentTimeStart: '2021-02-17T09:00:00.000Z',
				appointmentTimeEnd: '2021-02-17T09:30:00.000Z'
			},
			{
				accountHCPid: {
					profilePicture:
						'https://cdn.pixabay.com/photo/2019/12/06/13/40/anesthesia-4677401__480.jpg',

					price: {
						currency: '$'
					}
				},
				profileHCPid: {
					rating: {
						averageRating: 6,
						receivedRating: 16
					},
					firstName: 'Jee',
					lastName: 'Namutzko',
					description: 'Lorem',
					typeOfHCP: 'Dietitian'
				},
				amount: '79.25',
				_id: '6532654236549',
				appointmentTimeStart: '2021-03-14T08:00:00.000Z',
				appointmentTimeEnd: '2021-03-14T08:30:00.000Z'
			},
			{
				accountHCPid: {
					profilePicture:
						'https://images.unsplash.com/photo-1606562536640-895faa06c7f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',

					price: {
						currency: '$'
					}
				},
				profileHCPid: {
					rating: {
						averageRating: 5,
						receivedRating: 20
					},
					firstName: 'Chris',
					lastName: 'Nikeson',
					description: 'Something',
					typeOfHCP: 'Physical trainer'
				},
				amount: '70.25',
				_id: '6532654236550',
				appointmentTimeStart: '2021-01-17T07:00:00.000Z',
				appointmentTimeEnd: '2021-01-17T07:30:00.000Z'
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
