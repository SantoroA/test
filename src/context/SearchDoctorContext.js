import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const searchDoctorReducer = (state, action) => {
	switch (action.type) {
		case 'get_doctor_list':
			return {
				...state,
				doctors: action.payload
			};
		case 'get_doctor_list_simple':
			return {
				...state,
				docList: action.payload
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
		// try {
		// 	const response = await dianurseApi.get('/appointment/searchAppointment', {
		// 		params: search
		// 	});
		// 	console.log('size', response.data.length);
		// 	let i = 0;
		// 	let arrSimple = [];
		// 	let doc = [];
		// 	for (i; response.data.length > i; i++) {
		// 		doc = doc.concat({
		// 			id: response.data[i].profileHCPid._id,
		// 			image: response.data[i].accountHCPid.profilePicture,
		// 			firstname: response.data[i].profileHCPid.firstName,
		// 			lastname: response.data[i].profileHCPid.lastName,
		// 			description: response.data[i].profileHCPid.profileInfo,
		// 			averageRating: response.data[i].profileHCPid.rating.averageRating,
		// 			receivedRating: response.data[i].profileHCPid.rating.receivedRating
		// 		});
		// 	}

		// 	arrSimple = Array.from(new Set(doc.map((a) => a.id))).map((id) => {
		// 		return doc.find((a) => a.id === id);
		// 	});
		// 	console.log(arrSimple)
		// 	dispatch({ type: 'get_doctor_list_simple', payload: arrSimple });

		// 	dispatch({ type: 'get_doctor_list', payload: response.data });
		// 	let dateChoose = new Date(date).toDateString().split(' ');
		// 	let formatDate = `${dateChoose[0]}, ${dateChoose[2]} ${new Date(date).toLocaleString('default', {
		// 		month: 'long'
		// 	})}`;
		// 	dispatch({ type: 'save_date', payload: formatDate });
		// } catch (err) {
		// 	dispatch({ type: 'add_error', payload: err.message });
		// }
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
			// {
			// 	accountHCPid: {
			// 		profilePicture:
			// 			'https://images.pexels.com/photos/3881247/pexels-photo-3881247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			// 		price: {
			// 			currency: '$'
			// 		}
			// 	},
			// 	profileHCPid: {
			// 		rating: {
			// 			averageRating: 5,
			// 			receivedRating: 20
			// 		},
			// 		firstName: 'Princess Consuela',
			// 		lastName: 'Banana Hammock',
			// 		description: 'Phoebe Buffet',
			// 		typeOfHCP: 'Dietitian',
			// 		_id: '6532654236543'
			// 	},
			// 	amount: '76.25',
			// 	appointmentTimeStart: '2021-01-17T07:00:00.000Z',
			// 	appointmentTimeEnd: '2021-01-17T07:30:00.000Z',
			// 	_id: '600197175368a900279cb5c2'
			// },
			// {
			// 	accountHCPid: {
			// 		profilePicture:
			// 			'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvY3RvcnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
			// 		price: {
			// 			currency: '$'
			// 		}
			// 	},
			// 	profileHCPid: {
			// 		rating: {
			// 			averageRating: 9,
			// 			receivedRating: 13
			// 		},
			// 		firstName: 'Ken Addams',
			// 		lastName: 'Joey Tribbiani',
			// 		description: 'Phoebe Buffet',
			// 		typeOfHCP: 'Nephrologist',
			// 		_id: '6532654236544'
			// 	},
			// 	amount: '85.00',
			// 	appointmentTimeStart: '2021-01-20T11:00:00.000Z',
			// 	appointmentTimeEnd: '2021-01-20T11:30:00.000Z',
			// 	_id: '600197175368a900279cb5c1'
			// },
			// {
			// 	accountHCPid: {
			// 		profilePicture:
			// 			'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
			// 		price: {
			// 			currency: '$'
			// 		}
			// 	},
			// 	profileHCPid: {
			// 		rating: {
			// 			averageRating: 6,
			// 			receivedRating: 17
			// 		},
			// 		firstName: 'Austin',
			// 		lastName: 'Distel',
			// 		description: 'Lorem',
			// 		typeOfHCP: 'Ophthalmologist',
			// 		_id: '6532654236545'
			// 	},
			// 	amount: '63.50',
			// 	appointmentTimeStart: '2021-01-27T10:00:00.000Z',
			// 	appointmentTimeEnd: '2021-01-27T10:30:00.000Z',
			// 	_id: '600197175368a900279cb5c3'
			// },
			// {
			// 	accountHCPid: {
			// 		profilePicture:
			// 			'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
			// 		price: {
			// 			currency: '$'
			// 		}
			// 	},
			// 	profileHCPid: {
			// 		rating: {
			// 			averageRating: 10,
			// 			receivedRating: 16
			// 		},
			// 		firstName: 'Bojana',
			// 		lastName: 'Nikol',
			// 		description: 'Mastering',
			// 		typeOfHCP: 'Certified diabetes educator',
			// 		_id: '6532654236546'
			// 	},
			// 	amount: '76.25',
			// 	appointmentTimeStart: '2021-02-17T09:00:00.000Z',
			// 	appointmentTimeEnd: '2021-02-17T09:30:00.000Z',
			// 	_id: '600197175368a900279cb5c4'
			// },
			// {
			// 	accountHCPid: {
			// 		profilePicture: 'https://cdn.pixabay.com/photo/2019/12/06/13/40/anesthesia-4677401__480.jpg',
			// 		price: {
			// 			currency: '$'
			// 		}
			// 	},
			// 	profileHCPid: {
			// 		rating: {
			// 			averageRating: 6,
			// 			receivedRating: 16
			// 		},
			// 		firstName: 'Jee',
			// 		lastName: 'Namutzko',
			// 		description: 'Lorem',
			// 		typeOfHCP: 'Dietitian',
			// 		_id: '6532654236549'
			// 	},
			// 	amount: '79.25',
			// 	appointmentTimeStart: '2021-03-14T08:00:00.000Z',
			// 	appointmentTimeEnd: '2021-03-14T08:30:00.000Z',
			// 	_id: '600197175368a900279cb5c5'
			// },
			// {
			// 	accountHCPid: {
			// 		profilePicture:
			// 			'https://images.unsplash.com/photo-1606562536640-895faa06c7f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
			// 		price: {
			// 			currency: '$'
			// 		}
			// 	},
			// 	profileHCPid: {
			// 		rating: {
			// 			averageRating: 5,
			// 			receivedRating: 20
			// 		},
			// 		firstName: 'Chris',
			// 		lastName: 'Nikeson',
			// 		description: 'Something',
			// 		typeOfHCP: 'Physical trainer',
			// 		_id: '6532654236550'
			// 	},
			// 	amount: '70.25',
			// 	appointmentTimeStart: '2021-01-17T07:00:00.000Z',
			// 	appointmentTimeEnd: '2021-01-17T07:30:00.000Z',
			// 	_id: '600197175368a900279cb5c6'
			// }
		],
		docList: [
			// {
			// 	id: '6532654236543',
			// 	image:
			// 		'https://images.pexels.com/photos/3881247/pexels-photo-3881247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			// 	firstname: 'Princess Consuela',
			// 	lastname: 'Banana Hammock',
			// 	description: 'Phoebe Buffet',
			// 	averageRating: 4,
			// 	receivedRating: 25
			// },
			// {
			// 	id: '6532654236544',
			// 	image:
			// 		'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fGRvY3RvcnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
			// 	firstname: 'Ken',
			// 	lastname: 'Adams',
			// 	description: 'Joey Tribbiani',
			// 	averageRating: 3,
			// 	receivedRating: 70
			// },
			// {
			// 	id: '6532654236545',
			// 	image:
			// 		'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
			// 	firstname: 'Ross',
			// 	lastname: 'The Divorce Force',
			// 	description: 'Wet Pants Geller',
			// 	averageRating: 4.5,
			// 	receivedRating: 7
			// },
			// {
			// 	id: '6532654236546',
			// 	image:
			// 		'https://images.unsplash.com/photo-1606562536640-895faa06c7f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
			// 	firstname: 'Boss Man',
			// 	lastname: 'Bing-A-Lingg',
			// 	description: 'Chan-Chan Man',
			// 	averageRating: 3.5,
			// 	receivedRating: 15
			// },
			// {
			// 	id: '6532654236549',
			// 	image:
			// 		'https://images.unsplash.com/photo-1536064479547-7ee40b74b807?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
			// 	firstname: 'Big Green',
			// 	lastname: 'Poker Machine',
			// 	description: 'Fun Aunt Rachel',
			// 	averageRating: 3.5,
			// 	receivedRating: 15
			// },
			// {
			// 	id: '6532654236550',
			// 	image:
			// 		'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80',
			// 	firstname: 'Monana',
			// 	lastname: 'Harmonica',
			// 	description: 'The Candy Lady',
			// 	averageRating: 3.5,
			// 	receivedRating: 15
			// }
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
