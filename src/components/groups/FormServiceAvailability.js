import React, { useState } from 'react';
import FormTimeSlots from '../groups/FormTimeSlots';
import FormSaveTimeSlot from '../groups/FormTimeSlots';
import dianurseApi from '../../api/dianurseApi';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
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
			day = date.getDate();

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
	const [ edit, setEdit ] = useState(false)
	const [ editArr, setEditArr ] = useState([])

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

		for (i; (difference) >= i; i+= 86400000) {
			if (new Date(day_2 - i).getDay() === weekDay) {
				let newStartDate = new Date(`${availableEnd}, ${timeStart}`)
				let newLastDate = new Date(`${availableEnd}, ${timeEnd}`)
				let timeDuration = duration * 60000
				let slot = (newLastDate - newStartDate)/(timeDuration)
				let t = 1
				for (t; t <= slot; t++){
					arr = arr.concat({
						id: '5fe07c0034b01000263009d1', // 5fe07c500d1439002674aff5
						date: new Date(day_2 - i),
						week: new Date(day_2 - i).getDay(),
						start: new Date((newStartDate -i) + (timeDuration * t) -timeDuration),
						end: new Date((newStartDate -i) + (timeDuration * t) ),
						amount: amount,
					})
				}
			} 		
		}
		 try {
		 	const response = await dianurseApi.post('/appointment/createAvailability', {
		 		arr
		 	})
		 	console.log(response)	
		 	setEditArr([arr])
		 } catch (err) {
		 	console.log(err.message);
		 }
	}

	return (
		<div>
			<Typography align="center" variant="h4">
				Service Availability
			</Typography>
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
				{/* {editArr.length > 0 ? editArr.map((el) => {
					return <FormSaveTimeSlot
				key={el.start}
				start={el.start}
				end={el.end}
				// realDuration={el.duration}
				price={el.amount}
						/> // criar um novo elemento
				}): []} */} 
				{/* Add Array do save 
				se salvar vira estático
				se add vira form de novo
				delete arr e rota
				edit array e rota*/}
			</Grid>
		</div>
	);
};

export default FormServiceAvailability;
