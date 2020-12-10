import React, { useState } from 'react';
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
		padding: '2em'
	},
	checkboxGroup: {
		justifyContent: 'space-around',
		padding: '1em'
	}
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
	const classes = useStyles();

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

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
			</Grid>
		</div>
	);
};

export default FormServiceAvailability;
