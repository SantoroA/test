import React, { useState, useEffect } from 'react';
import FormTimeSlots from '../groups/FormTimeSlots';
import dianurseApi from '../../api/dianurseApi';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	section: {
		justifyContent: 'space-around',
		padding: '2em',
		marginBottom: '2rem'
	},
	checkboxGroup: {
		justifyContent: 'space-around',
		padding: '1em'
	},
});

const FormServiceAvailability = () => {

	let now = new Date();
	const getFormattedDate = (date) => {
		const year = date.getFullYear(),
			month = ('0' + (date.getMonth() + 1)).slice(-2),
			day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

		return [ year, month, day ].join('-'); 
	};

	const [ availableStart, setAvailableStart ] = useState(getFormattedDate(now));
	const [ availableEnd, setAvailableEnd ] = useState(getFormattedDate(now));
	const [ state, setState ] = useState({
		checkedA: true,
		checkedB: false,
		checkedC: false,
		checkedD: false,
		checkedE: false,
		checkedF: false,
		checkedG: true
	});
	const [ timeStart, setTimeStart ] = useState('07:00');
	const [ timeEnd, setTimeEnd ] = useState('12:00');
	const [ amount, setAmount ] = useState(75);
	const [ duration, setDuration ] = useState('');
	const [ weekDay, setweekDay ] = useState(1); // onChange na hora que o doctor clica no tab valores de 0 a 6 0 é domingo
	const [ slotSave, setSlotSave] = useState([])

	const getFromBack = async() => { // effect function - isso vai buscar os slots do back
		let id = '5fe8b0c48bef090026e253b7' // get id from doctor in the context
		try {
			const response = await dianurseApi.get('/appointment/getAvailabilitySlot', {
				params: { id }
			})
			let i = 0;
			let slotArr = [];
			let showArr = [];
			let arr = [];
			
			for (i; i < response.data.length; i++) {
				slotArr = slotArr.concat(response.data[i].slotCreated)
			}
			slotArr = [...new Set(slotArr)]
			let l = 0;
			for (l; l < slotArr.length; l++){
				// eslint-disable-next-line no-loop-func
				let data = response.data.filter(el => {
					return el.slotCreated === slotArr[l]
				})
				let availability = data.filter(el => {
					return el.appointmentStatus === "Available"
				})
				let id = data.slice(0,1).map(el => {
					return el.accountHCPid
				})
				// let weedDay, WeekDay vai ser usado pro update
				let editStatus = availability < data ? true : false
				let max = getFormattedDate(new Date(Math.max(...data.map(e => new Date(e.appointmentDate)))));
				let min = getFormattedDate(new Date(Math.min(...data.map(e => new Date(e.appointmentDate)))));
				let amount = response.data[l].amount
				let startTime = new Date(Math.min(...data.map(e => new Date(e.appointmentTimeStart))));
				let startHours = startTime.getHours();
					startHours = startHours > 9 ? startHours : '0' + startHours

				let startMin = startTime.getMinutes();
					startMin = startMin > 9 ? startMin : '0' + startMin

				let minEndTime = new Date(Math.min(...data.map(e => new Date(e.appointmentTimeEnd))));
				let endTime = new Date(Math.max(...data.map(e => new Date(e.appointmentTimeEnd))));
				let endHours = endTime.getHours();
					endHours = endHours > 9 ? endHours : '0' + endHours

				let endMin = startTime.getMinutes();
					endMin = endMin > 9 ? endMin : '0' + endMin

				let slot = (minEndTime - startTime)/60000
				arr = arr.concat({  startDay: min,
									endDay: max,
									amount: amount,
									startTime: `${startHours} :${startMin}`,
									endTime: `${endHours}:${endMin}`,
									slot,
									slotCreated: slotArr[l],
									editStatus,
									id,
									edit: false
									 })
			}
			showArr = showArr.concat(arr)
			setSlotSave(showArr)
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleChangePrice = ( maskedValue) => {
		setAmount(maskedValue);
	};

	const classes = useStyles();

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleSubmit = async() => {
		let day_1 = new Date(availableStart)
		let day_2 = new Date(availableEnd)
		let difference = Math.ceil(day_2 - day_1)
		let arr = []
		let i = 0
		let slotCreated = new Date()

		for (i; (difference) >= i; i+= 86400000) {
			if (new Date(day_2 - i).getDay() === weekDay) {
				let newStartDate = new Date(`${availableEnd}, ${timeStart}`)
				let newLastDate = new Date(`${availableEnd}, ${timeEnd}`)
				let timeDuration = duration * 60000
				let slot = (newLastDate - newStartDate)/(timeDuration)
				let t = 1
				for (t; t <= slot; t++){
					arr = arr.concat({
						id: '5fe8b0c48bef090026e253b7',//'5fe8b05d8bef090026e253b6', //5fe8b0c48bef090026e253b7
						date: new Date(day_2 - i),
						week: new Date(day_2 - i).getDay(),
						start: new Date((newStartDate -i) + (timeDuration * t) -timeDuration),
						end: new Date((newStartDate -i) + (timeDuration * t) ),
						amount: amount, // check amount esta sendo salvo com o valor certo
						slotCreated
					})
				}
			} 		
		}
		try {
		 	const response = await dianurseApi.post('/appointment/createAvailability', {
		 		arr
		 	})
		 	console.log(response)	
			setSlotSave([...slotSave, 
						{
							startDay: availableStart,
							endDay: availableEnd,
							amount: amount,
							startTime: timeStart,
							endTime: timeEnd,
							slot: duration,
							slotCreated,
							editStatus: false,
							id: '5fe8b0c48bef090026e253b7',
							edit: false
			 			}])
		 } catch (err) {
		 	console.log(err.message);
		 }
	}

	const deleteSlot = async(key, id) => {
		let newSlot =  slotSave.filter(el => { 
            return el.slotCreated !== key; 
		});

		let slotData = {
			slotCreated: key,
			id
		}
		try {
			const response = await dianurseApi.delete(`/appointment/deleteAvailability/`, {
				data: slotData
			})
			console.log(response.data)	
			setSlotSave(newSlot)
		} catch (err) {
			console.log(err.message);
		}	
	}

	const setEditSlot = (key) => {
		const elementsIndex = slotSave.findIndex(el => el.slotCreated === key )
		let newArray = [...slotSave]
		newArray[elementsIndex] = {...newArray[elementsIndex], edit: !newArray[elementsIndex].edit}
		setSlotSave(newArray)
	}

	const updateSlot = async(key, id) => {
		const elementsIndex = slotSave.findIndex(el => el.slotCreated === key )
		let newArray = [...slotSave]
		newArray[elementsIndex] = {...newArray[elementsIndex], 
				edit: !newArray[elementsIndex].edit,
				startDay: availableStart,
				endDay: availableEnd,
				startTime: timeStart,
				endTime: timeEnd,
				slot: duration,
				}
		let day_1 = new Date(availableStart)
		let day_2 = new Date(availableEnd)
		let difference = Math.ceil(day_2 - day_1)
		let arr = []
		let i = 0
	
		for (i; (difference) >= i; i+= 86400000) {
			if (new Date(day_2 - i).getDay() === weekDay) {
				let newStartDate = new Date(`${availableEnd}, ${timeStart}`)
				let newLastDate = new Date(`${availableEnd}, ${timeEnd}`)
				let timeDuration = duration * 60000
				let slot = (newLastDate - newStartDate)/(timeDuration)
				let t = 1
				for (t; t <= slot; t++){
					arr = arr.concat({
						id: id.toString(),
						date: new Date(day_2 - i),
						week: new Date(day_2 - i).getDay(),
						start: new Date((newStartDate -i) + (timeDuration * t) -timeDuration),
						end: new Date((newStartDate -i) + (timeDuration * t) ),
						amount: amount, // check amount estpa sendo salvo com o valor certo
						slotCreated: key
					})
				}
			} 		
		}
		try {
			const response = await dianurseApi.post(`/appointment/updateAvailability`, {
				arr
			})
			console.log(response.data)	
			setSlotSave(newArray)
		} catch (err) {
			console.log(err.message);
		}	
	}

	return (
		<div>
			<Typography align="center" variant="h4">
				Service Availability
			</Typography>
			<button onClick={getFromBack}>Get from Backend</button>
			<Grid container className={classes.section}>
				<TextInput
					id="date"
					label="Available from"
					type="date"
					variant="outlined"
					defaultValue={availableStart} // today day?
					onChange={(e) => setAvailableStart(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextInput
					id="date"
					label="Available to"
					type="date"
					variant="outlined"
					defaultValue={availableEnd} // today day?
					onChange={(e) => setAvailableEnd(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
				/>
			</Grid>
			<Grid container direction="column" className={classes.section}>
				<Grid item>
					<Typography align="center" variant="h5">
						Weekly off Days
					</Typography>
				</Grid>
				<Grid item>
					<FormGroup row className={classes.checkboxGroup}>
						<FormControlLabel
							control={<Checkbox checked={state.checkedA} name="checkedA" onChange={handleChange} />}
							label="Sunday"
						/>
						<FormControlLabel
							control={<Checkbox checked={state.checkedB} name="checkedB" onChange={handleChange} />}
							label="Monday"
						/>
						<FormControlLabel
							control={<Checkbox checked={state.checkedC} name="checkedC" onChange={handleChange} />}
							label="Tuesday"
						/>
						<FormControlLabel
							control={<Checkbox checked={state.checkedD} name="checkedD" onChange={handleChange} />}
							label="Wednesday"
						/>
						<FormControlLabel
							control={<Checkbox checked={state.checkedE} name="checkedE" onChange={handleChange} />}
							label="Thursday"
						/>
						<FormControlLabel
							control={<Checkbox checked={state.checkedF} name="checkedF" onChange={handleChange} />}
							label="Friday"
						/>
						<FormControlLabel
							control={<Checkbox checked={state.checkedG} name="checkedG" onChange={handleChange} />}
							label="Saturday"
						/>
					</FormGroup>
				</Grid>
				<FormTimeSlots
				send={(e) => {
					e.preventDefault() 
					handleSubmit()
				}}
				changeTimeStart={(e) => setTimeStart(e.target.value)}
				realTimeStart={timeStart}
				changeTimeEnd={(e) => setTimeEnd(e.target.value)}
				realTimeEnd={timeEnd}
				changeDuration={(e) => setDuration(e.target.value)}
				realDuration={duration}
				changePrice={handleChangePrice}
				realPrice={amount}

				/>
				
				{ slotSave.map((el) => {
						return el.edit ? 
						<form key={el.slotCreated} onSubmit={ (e) => {
							e.preventDefault()
							updateSlot(el.slotCreated, el.id)} }>	
						<div >
							<input type="date"
							defaultValue={el.startDay}
							onChange={(e) => setAvailableStart(e.target.value)}
							></input>
							<input type="date"
							defaultValue={el.endDay}
							onChange={(e) => setAvailableEnd(e.target.value)}
							></input>
							<select
							defaultValue={el.slot}
							onChange={(e) => setDuration(e.target.value)}
							>
							<option value={20}>20 min</option>
							<option value={30}>30 min</option>
							<option value={40}>40 min</option>
							<option value={60}>1 hour</option>
							</select>
							<input
							type="time"
							defaultValue={'07:00'}
							onChange={(e) => setTimeStart(e.target.value)}
							></input>
							<input
							type="time"
							onChange={(e) => setTimeEnd(e.target.value)}
							defaultValue={el.endTime}
							></input>
							<input
							type="number"
							onChange={handleChangePrice}
							defaultValue={el.amount}
							></input>
							<button type="submit">Update</button>
						</div>
						</form>
						:
						<div key={el.slotCreated}>
								<p>${el.amount}</p>
								<p>startDay: {el.startDay}</p>
								<p>endDay: {el.endDay}</p>
								<p>startTime: {el.startTime}</p>
								<p>endDay: {el.endTime}</p>
								<p>slot: {el.slot}</p>
								<button onClick ={() => deleteSlot(el.slotCreated, el.id)}>Delete</button>
								<button disabled = { el.editStatus } onClick={() => { setEditSlot(el.slotCreated)}}>Edit</button>
						</div>
					})
				}
			</Grid>
		</div>
	);
};

export default FormServiceAvailability;
