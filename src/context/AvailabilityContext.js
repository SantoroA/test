import createDataContext from './createDataContext';
import dianurseApi from '../api/dianurseApi';

const availabilityReducer = (state, action) => {
	switch (action.type) {
		case 'get_slots':
			return {
				...state,
				slots: action.payload
			};
		case 'create_slot':
			return {
				...state,

				slots: [
					...state.slots,
					{
						startDay: action.payload.startDay,
						endDay: action.payload.endDay,
						amount: action.payload.amount,
						startTime: action.payload.startTime,
						endTime: action.payload.endTime,
						slot: action.payload.slot,
						slotCreated: action.payload.slotCreated,
						editStatus: action.payload.editStatus,
						id: action.payload.id,
						weekDay: action.payload.weekDay,
						isEditing: false
					}
				]
			};
		case 'delete_slot':
			return { ...state, slots: state.slots.filter((slot) => slot.slotCreated !== action.payload) };
		case 'update_slots':
			console.log(action.payload);
			return {
				...state,
				// slots: [ 'test' ]
				slots: state.slots.map(
					(slot) => (slot.slotCreated === action.payload.slotCreated ? action.payload : slot)
				)
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

const getFormattedDate = (date) => {
	const year = date.getFullYear(),
		month = ('0' + (date.getMonth() + 1)).slice(-2),
		day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

	return [ year, month, day ].join('-');
};

const getSlots = (dispatch) => {
	return async (id) => {
		// effect function - isso vai buscar os slots do back
		try {
			const response = await dianurseApi.get('/appointment/getAvailabilitySlot', {
				params: { id }
			});
			let i = 0;
			let slotArr = [];
			let showArr = [];
			let arr = [];

			for (i; i < response.data.length; i++) {
				slotArr = slotArr.concat(response.data[i].slotCreated);
			}
			slotArr = [ ...new Set(slotArr) ];
			let l = 0;
			for (l; l < slotArr.length; l++) {
				// eslint-disable-next-line no-loop-func
				let data = response.data.filter((el) => {
					return el.slotCreated === slotArr[l];
				});
				let availability = data.filter((el) => {
					return el.appointmentStatus === 'Available';
				});
				let id = data.slice(0, 1).map((el) => {
					return el.accountHCPid;
				});
				// let weedDay, WeekDay vai ser usado pro update
				let editStatus = availability < data ? true : false;
				let max = getFormattedDate(new Date(Math.max(...data.map((e) => new Date(e.appointmentDate)))));
				let min = getFormattedDate(new Date(Math.min(...data.map((e) => new Date(e.appointmentDate)))));
				let amount = response.data[l].amount;
				let startTime = new Date(Math.min(...data.map((e) => new Date(e.appointmentTimeStart))));
				let startHours = startTime.getHours();
				startHours = startHours > 9 ? startHours : '0' + startHours;

				let startMin = startTime.getMinutes();
				startMin = startMin > 9 ? startMin : '0' + startMin;

				let minEndTime = new Date(Math.min(...data.map((e) => new Date(e.appointmentTimeEnd))));
				let endTime = new Date(Math.max(...data.map((e) => new Date(e.appointmentTimeEnd))));
				let endHours = endTime.getHours();
				endHours = endHours > 9 ? endHours : '0' + endHours;

				let endMin = startTime.getMinutes();
				endMin = endMin > 9 ? endMin : '0' + endMin;

				let slot = (minEndTime - startTime) / 60000;
				arr = arr.concat({
					startDay: min,
					endDay: max,
					amount: amount,
					startTime: `${startHours}:${startMin}`,
					endTime: `${endHours}:${endMin}`,
					slot,
					weekDay: data[l].appointmentWeek,
					slotCreated: slotArr[l],
					editStatus,
					id,
					isEditing: false
				});
			}
			showArr = showArr.concat(arr);
			console.log(showArr);
			dispatch({ type: 'get_slots', payload: showArr });
		} catch (err) {
			dispatch({ type: 'add_error', payload: 'Failed to get saved slots from server' });
			console.log(err.message);
		}
	};
};

const createSlot = (dispatch) => {
	return async ({ availableStart, availableEnd, timeStart, timeEnd, amount, duration, weekDay, id }) => {
		let day_1 = new Date(availableStart);
		let day_2 = new Date(availableEnd);
		let difference = Math.ceil(day_2 - day_1);
		let arr = [];
		let i = 0;
		let slotCreated = new Date();
		console.log(id);

		for (i; difference >= i; i += 86400000) {
			if (new Date(day_2 - i).getDay() === weekDay) {
				let newStartDate = new Date(`${availableEnd}, ${timeStart}`);
				let newLastDate = new Date(`${availableEnd}, ${timeEnd}`);
				let timeDuration = duration * 60000;
				let slot = (newLastDate - newStartDate) / timeDuration;
				let t = 1;
				for (t; t <= slot; t++) {
					arr = arr.concat({
						id: id,
						date: new Date(day_2 - i),
						week: new Date(day_2 - i).getDay(),
						start: new Date(newStartDate - i + timeDuration * t - timeDuration),
						end: new Date(newStartDate - i + timeDuration * t),
						amount: amount, // check amount esta sendo salvo com o valor certo
						slotCreated
					});
				}
			}
		}
		try {
			// const response = await dianurseApi.post('/appointment/createAvailability', {
			// 	arr
			// });
			// console.log(response);
			let x = 200;
			// if (response.status === 200) {
			if (x === 200) {
				return dispatch({
					type: 'create_slot',
					payload: {
						startDay: availableStart,
						endDay: availableEnd,
						amount: amount,
						startTime: timeStart,
						endTime: timeEnd,
						slot: duration,
						slotCreated,
						editStatus: false,
						weekDay,
						id: id
					}
				});
			}
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};
const deleteSlot = (dispatch) => {
	return async (key, id) => {
		console.log(id);
		let slotData = {
			slotCreated: key,
			id
		};
		try {
			const response = await dianurseApi.delete(`/appointment/deleteAvailability/`, {
				data: slotData
			});
			console.log(response.data);
			dispatch({ type: 'delete_slot', payload: key });
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};
const updateSlot = (dispatch) => {
	return async ({ availableStart, availableEnd, timeStart, timeEnd, amount, duration, weekDay, id, key }) => {
		let day_1 = new Date(availableStart);
		let day_2 = new Date(availableEnd);
		let difference = Math.ceil(day_2 - day_1);
		let arr = [];
		let i = 0;

		for (i; difference >= i; i += 86400000) {
			if (new Date(day_2 - i).getDay() === weekDay) {
				let newStartDate = new Date(`${availableEnd}, ${timeStart}`);
				let newLastDate = new Date(`${availableEnd}, ${timeEnd}`);
				let timeDuration = duration * 60000;
				let slot = (newLastDate - newStartDate) / timeDuration;
				let t = 1;
				for (t; t <= slot; t++) {
					arr = arr.concat({
						id: id.toString(),
						date: new Date(day_2 - i),
						week: new Date(day_2 - i).getDay(),
						start: new Date(newStartDate - i + timeDuration * t - timeDuration),
						end: new Date(newStartDate - i + timeDuration * t),
						amount: amount, // check amount estpa sendo salvo com o valor certo
						slotCreated: key
					});
				}
			}
		}
		try {
			console.log(availableStart, availableEnd, timeStart, timeEnd, amount, duration, weekDay, id, key);
			const response = await dianurseApi.post(`/appointment/updateAvailability`, {
				arr
			});
			console.log(response.data);
			if (response.status === 200) {
				dispatch({
					type: 'update_slots',
					payload: {
						startDay: availableStart,
						endDay: availableEnd,
						amount: amount,
						startTime: timeStart,
						endTime: timeEnd,
						slot: duration,
						slotCreated: key,
						editStatus: false,
						isEditing: false,
						weekDay,
						id
					}
				});
			}
		} catch (err) {
			dispatch({ type: 'add_error', payload: err.message });
			console.log(err.message);
		}
	};
};

const setIsEditing = (dispatch) => {
	return (key) => {
		dispatch({ type: 'set_is_editing', payload: key });
	};
};
// const updateSlot = (dispatch) => {
// 	return ({ availableStart, availableEnd, timeStart, timeEnd, amount, duration, weekDay, id, key }) => {
// 		console.log('inside updateSlot context', availableStart, availableEnd);
// 		dispatch({
// 			type: 'update_slots',
// 			payload: {
// 				startDay: availableStart,
// 				endDay: availableEnd,
// 				amount: amount,
// 				startTime: timeStart,
// 				endTime: timeEnd,
// 				slot: duration,
// 				slotCreated: key,
// 				editStatus: false,
// 				id,
// 				weekDay,
// 				isEditing: false
// 			}
// 		});
// 	};
// };
// let day_1 = new Date(availableStart);
// let day_2 = new Date(availableEnd);
// let difference = Math.ceil(day_2 - day_1);
// let arr = [];
// let i = 0;

// for (i; difference >= i; i += 86400000) {
// 	if (new Date(day_2 - i).getDay() === weekDay) {
// 		let newStartDate = new Date(`${availableEnd}, ${timeStart}`);
// 		let newLastDate = new Date(`${availableEnd}, ${timeEnd}`);
// 		let timeDuration = duration * 60000;
// 		let slot = (newLastDate - newStartDate) / timeDuration;
// 		let t = 1;
// 		for (t; t <= slot; t++) {
// 			arr = arr.concat({
// 				id: id.toString(),
// 				date: new Date(day_2 - i),
// 				week: new Date(day_2 - i).getDay(),
// 				start: new Date(newStartDate - i + timeDuration * t - timeDuration),
// 				end: new Date(newStartDate - i + timeDuration * t),
// 				amount: amount, //check amount estpa sendo salvo com o valor certo
// 				slotCreated: key
// 			});
// 		}
// 	}
// }
// try {
// const response =  dianurseApi.post(`/appointment/updateAvailability`, {
// 	arr
// });
// console.log(response.data);
// if(response.status === 200) {
// 	dispatch({
// 		type: 'update_slots',
// 		payload: {
// 			startDay: availableStart,
// 			endDay: availableEnd,
// 			amount: amount,
// 			startTime: timeStart,
// 			endTime: timeEnd,
// 			slot: duration,
// 			slotCreated: key,
// 			editStatus: false,
// 			id,
// 			weekDay,
// 			isEditing: false
// 		}
// 	});
// }
// } catch (err) {
// 	dispatch({ type: 'add_error', payload: err.message });
// 	console.log(err.message);
// }
// 	}
// }

//DIALOG
const closeDialog = (dispatch) => () => {
	dispatch({ type: 'close_dialog' });
};

export const { Context, Provider } = createDataContext(
	availabilityReducer,
	{ getSlots, createSlot, deleteSlot, updateSlot, closeDialog, setIsEditing },
	{
		slots: [],
		dialogMessage: '',
		dialogOpen: false
	}
);
