import React from 'react';
import useStyles from './style';
//MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const FormTemperature = ({ temperature, setTemperature, tempUnit, setTempUnit }) => {
	const classes = useStyles();
	return (
		<Container maxWidth="sm">
			<Typography color="textSecondary" variant="body1">
				If you have a thermometer, adding your temperature now will save time during your visit. No guessing
				please!
			</Typography>

			<Grid className={classes.optionsWrapper} spacing={1} container>
				<Grid item sm={5} xs={6}>
					<TextField
						type="number"
						fullWidth
						label="Amount"
						value={temperature}
						variant="outlined"
						onChange={(e) => setTemperature(e.target.value)}
					/>
				</Grid>
				<Grid item sm={5} xs={6}>
					<TextField
						type="number"
						fullWidth
						label="Unit"
						select
						value={tempUnit}
						variant="outlined"
						onChange={(e) => setTempUnit(e.target.value)}
					>
						<MenuItem value="celsius">Celsius</MenuItem>
						<MenuItem value="fahrenheit">Fahrenheit</MenuItem>
					</TextField>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FormTemperature;
