import React from 'react';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const FormDuration = ({
	onSubmitForm,
	submitText,
	symptomTime,
	setSymptomTime,
	symptomTimeUnit,
	setSymptomTimeUnit
}) => {
	const classes = useStyles();
	return (
		<Container maxWidth="sm">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmitForm();
				}}
			>
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
					<Grid container className={classes.buttonWrapper}>
						<Grid item xs={5} sm={3}>
							<ButtonNoBorder
								className={classes.skipButton}
								onClick={() => {
									setSymptomTime('');
									setSymptomTimeUnit('');
									onSubmitForm();
								}}
							>
								<Typography>Skip question</Typography>
							</ButtonNoBorder>
						</Grid>
						<Grid item xs={5} sm={3}>
							<ButtonFilled fullWidth className={classes.nextButton} type="submit">
								{submitText}
							</ButtonFilled>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default FormDuration;
