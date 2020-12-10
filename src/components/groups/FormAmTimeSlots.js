import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
import ButtonFilled from '../customUi/ButtonFilled';
import Dropdown from '../customUi/Dropdown';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles({
	section: {
		justifyContent: 'space-around',
		padding: '2em'
	},
	checkboxGroup: {
		justifyContent: 'space-around',
		padding: '1em'
	}
});

const FormAmTimeSlots = () => {
	const [ timeStart, setTimeStart ] = useState('07:00');
	const [ timeEnd, setTimeEnd ] = useState('12:00');
	const [ amount, setAmount ] = useState(75);
	const [ duration, setDuration ] = useState('');
	const classes = useStyles();

	const handleChange = (maskedValue) => {
		setAmount(maskedValue);
	};

	return (
		<div>
			<Typography align="center" variant="h4">
				AM Time Slots
			</Typography>

			<FormGroup row className={classes.section}>
				<TextInput
					id="time"
					label="Time from"
					type="time"
					variant="outlined"
					defaultValue={timeStart}
					onChange={(e) => setTimeStart(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextInput
					id="time"
					label="Time to"
					type="time"
					variant="outlined"
					defaultValue={timeEnd} // today day?
					onChange={(e) => setTimeEnd(e.target.value)}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<FormControl variant="outlined">
					<InputLabel id="demo-simple-select-outlined-label">Slot Duration</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						label="Slot Duration"
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>20 min</MenuItem>
						<MenuItem value={20}>30 min</MenuItem>
						<MenuItem value={30}>40 min</MenuItem>
						<MenuItem value={30}>1 hour</MenuItem>
					</Select>
				</FormControl>

				<CurrencyInput value={amount} prefix="$" onChange={handleChange} />
				<ButtonFilled type="submit" variant="contained" color="primary">
					Save
				</ButtonFilled>
			</FormGroup>
		</div>
	);
};

export default FormAmTimeSlots;
