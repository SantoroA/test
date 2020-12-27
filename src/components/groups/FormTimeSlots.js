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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
	section: {
		justifyContent: 'space-around',
		padding: '2em'
	}
});

const FormTimeSlots = (props) => {
	// const [ timeStart, setTimeStart ] = useState('07:00');
	// const [ timeEnd, setTimeEnd ] = useState('12:00');
	// const [ amount, setAmount ] = useState(75);
	// const [ duration, setDuration ] = useState('');
	const classes = useStyles();

	// const handleChange = (maskedValue) => {
	// 	setAmount(maskedValue);
	// };

	return (
		<div>
			<Typography align="center" variant="h4">
				Time Slots
			</Typography>
			<form onSubmit={props.send}>
				<FormGroup row className={classes.section} >
					<TextInput
						id="time"
						label="Time from"
						type="time"
						variant="outlined"
						defaultValue={props.realTimeStart}
						onChange={props.changeTimeStart}
						InputLabelProps={{
							shrink: true
						}}
					/>
					<TextInput
						id="time"
						label="Time to"
						type="time"
						variant="outlined"
						defaultValue={props.realTimeEnd} // today day?
						onChange={props.changeTimeEnd}
						InputLabelProps={{
							shrink: true
						}}
					/>
					<FormControl variant="outlined">
						<InputLabel id="demo-simple-select-outlined-label">Slot Duration</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={props.realDuration}
							onChange={props.changeDuration}
							label="Slot Duration"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={20}>20 min</MenuItem>
							<MenuItem value={30}>30 min</MenuItem>
							<MenuItem value={40}>40 min</MenuItem>
							<MenuItem value={60}>1 hour</MenuItem>
						</Select>
					</FormControl>

					<CurrencyInput value={props.realPrice} prefix="$" onChange={props.changePrice} />
					<ButtonFilled type="submit" variant="contained" color="primary">
						Save
					</ButtonFilled>
					<ButtonFilled variant="contained" disabled color="primary">
						<AddIcon />
					</ButtonFilled>
					<ButtonFilled variant="contained" disabled color="primary">
						<EditIcon />
					</ButtonFilled>
					<ButtonFilled variant="contained" disabled color="primary">
						<DeleteForeverIcon />
					</ButtonFilled>
				</FormGroup>
			</form>
		</div>
	);
};

export default FormTimeSlots;
