import React from 'react';
import useStyles from './style';
//MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const FormDuration = ({ symptomTime, setSymptomTime, symptomTimeUnit, setSymptomTimeUnit }) => {
	const classes = useStyles();
	return (
		<Container maxWidth="sm">
			<Grid className={classes.optionsWrapper} container>
				<Grid item xs={5}>
					<TextField
						type="number"
						fullWidth
						required
						label="Amount"
						value={symptomTime}
						variant="outlined"
						onChange={(e) => setSymptomTime(e.target.value)}
					/>
				</Grid>
				<Grid item xs={5}>
					<TextField
						type="number"
						fullWidth
						required
						label="Unit"
						select
						value={symptomTimeUnit}
						variant="outlined"
						onChange={(e) => setSymptomTimeUnit(e.target.value)}
					>
						<MenuItem value="hours">Hours</MenuItem>
						<MenuItem value="days">Days</MenuItem>
						<MenuItem value="weeks">Weeks</MenuItem>
						<MenuItem value="months">Months</MenuItem>
						<MenuItem value="years">Years</MenuItem>
					</TextField>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FormDuration;
