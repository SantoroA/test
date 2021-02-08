import React from 'react';
//MATERIAL UI
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import useStyles from './style';

const TimeFilter = ({ filterState, setFilterState }) => {
	const classes = useStyles();

	const handleChange = (e) => {
		setFilterState({ ...filterState, time: e.target.value });
	};
	return (
		<Grid className={classes.time}>
			<FormControl component="fieldset">
				<FormLabel component="legend">Time Frame</FormLabel>
				<RadioGroup aria-label="time-frame" name="time-frame" value={filterState.time} onChange={handleChange}>
					<FormControlLabel
						value="morning"
						control={<Radio color="primary" />}
						label="Morning - From 6:00 to 11:59"
					/>
					<FormControlLabel
						value="afternoon"
						control={<Radio color="primary" />}
						label="Afternoon - From 12:00 to 17:59"
					/>
					<FormControlLabel
						value="evening"
						control={<Radio color="primary" />}
						label="Night - From 18:00 to 22:00"
					/>
				</RadioGroup>
			</FormControl>
		</Grid>
	);
};
export default TimeFilter;
