import React from 'react';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import TextInputRounder from '../../customUi/TextInputRounder';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const FormReason = ({ onSubmitForm, submitText, reasonForVisit, setReasonForVisit }) => {
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
					<Grid item xs={8}>
						<TextInputRounder
							fullWidth
							required
							id="reason"
							placeholder="Search for a Reason"
							select
							variant="outlined"
							value={reasonForVisit}
							onChange={(e) => setReasonForVisit(e.target.value)}
							InputLabelProps={{
								shrink: true
							}}
						>
							<MenuItem value="check-up">Check-up</MenuItem>
							<MenuItem value="emergency">Emergency</MenuItem>
							<MenuItem value="headache">Headache</MenuItem>
							<MenuItem value="acne">Acne</MenuItem>
							<MenuItem value="allergies">Acid Reflux</MenuItem>
							<MenuItem value="anxiety">Anxiety</MenuItem>
							<MenuItem value="animal-bite">Animal bite</MenuItem>
							<MenuItem value="asthma">Asthma</MenuItem>
							<MenuItem value="cold">Cold</MenuItem>
							<MenuItem value="covid">Coronavirus (Covid 19) Evaliation</MenuItem>
							<MenuItem value="cough">Cough</MenuItem>
							<MenuItem value="depression">Depression</MenuItem>
							<MenuItem value="high-colesterol">High Cholesterol</MenuItem>
							<MenuItem value="nasal-congestion">Nasal congestion</MenuItem>
						</TextInputRounder>
					</Grid>
					<Grid container className={classes.buttonWrapper}>
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

export default FormReason;
