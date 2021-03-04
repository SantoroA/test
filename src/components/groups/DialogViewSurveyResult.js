import React from 'react';
import FormSymptoms from './FormsSurvey/symptoms';
import FormHealthProfile from './FormsSurvey/healthProfile';
//CUSTOM UI
import ButtonNoBorder from '../customUi/ButtonNoBorder';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		padding: '2rem'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	},
	subtitle: {
		fontWeight: 700,
		marginBottom: '1rem',
		marginTop: '3rem'
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		// marginTop: '1rem',
		marginBottom: '1rem',
		alignItems: 'center'
	},
	section: {
		textAlign: 'center'
	},
	answer: {
		fontWeight: 'bold'
	},
	title: {
		marginTop: '1rem',
		textDecoration: 'underline'
	}
});


const DialogViewSurveyResult = ({ selectedSurvey, isOpen, close }) => {
	const { selected, results } = selectedSurvey;
	const classes = useStyles();

	return (
		<Dialog fullScreen open={isOpen} onClose={close}>
			<Container maxWidth="md" className={classes.layout}>
				<div className={classes.buttonWrapper}>
					<ButtonNoBorder onClick={close}>
						<ArrowBackIcon />
						<Typography>Back</Typography>
					</ButtonNoBorder>
				</div>
				<Divider className={classes.divider} />
				<Grid container className={classes.container}>
					<Typography className={classes.title} variant="h3">
						Results
					</Typography>
					{selected &&
					results && (
						<div>
							{selected.reason && (
								<Container maxWidth="sm" className={classes.section}>
									<Typography className={classes.subtitle} variant="h5" color="primary">
										What is the reason for your visit?
									</Typography>
									<Typography className={classes.answer}>{results.reasonForVisit}</Typography>
									<Typography className={classes.subtitle} variant="h5" color="primary">
										How long have you felt this way?
									</Typography>
									<Typography className={classes.answer}>
										{results.symptomTime} {results.symptomTimeUnit}
									</Typography>
								</Container>
							)}
							{selected.symptoms && (
								<Container maxWidth="sm" className={classes.section}>
									<Typography className={classes.subtitle} variant="h5" color="primary">
										Do you have any of these symptoms?
									</Typography>
									<FormSymptoms
										isDisabled={true}
										symptoms={results.symptoms}
										handleChange={() => {}}
									/>
								</Container>
							)}
							{selected.healthProfile && (
								<Container maxWidth="sm" className={classes.section}>
									<Typography className={classes.subtitle} variant="h5" color="primary">
										Complete your health profile
									</Typography>
									<FormHealthProfile
										isDisabled={true}
										isTakingMeds={results.isTakingMeds}
										setIsTakingMeds={() => {}}
										hasDrugAllergies={results.hasDrugAllergies}
										setHasDrugAllergies={() => {}}
										medConditions={results.medConditions}
										handleChangeMedCondition={() => {}}
									/>
								</Container>
							)}
							{selected.oxygen && (
								<Container maxWidth="sm" className={classes.section}>
									<Typography className={classes.subtitle} variant="h5" color="primary">
										Add your oxygen level
									</Typography>
									<Typography className={classes.answer}>{results.oxygenSaturation}%</Typography>
								</Container>
							)}
							{selected.temperature && (
								<Container maxWidth="sm" className={classes.section}>
									<Typography className={classes.subtitle} variant="h5" color="primary">
										Add your temperature
									</Typography>
									<Typography className={classes.answer}>
										{results.temperature} {results.tempUnit}
									</Typography>
								</Container>
							)}
						</div>
					)}
				</Grid>
			</Container>
		</Dialog>
	);
};
export default DialogViewSurveyResult;
