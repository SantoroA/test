import React, { useState } from 'react';
import { formatDateDisplay } from '../../helpers/dateHelper';
import FormSymptoms from './FormsSurvey/symptoms';
import FormReason from './FormsSurvey/reason';
import FormHealthProfile from './FormsSurvey/healthProfile';
import FormDuration from './FormsSurvey/duration';
import FormOxygen from './FormsSurvey/oxygen';
import FormTemperature from './FormsSurvey/temperature';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
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
	closeButton: {
		alignSelf: 'flex-end'
	},
	iconsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},

	skipButton: {
		color: 'rgba(160, 164, 168, 1)',
		'&:hover': {
			color: '#07B597'
		}
	},
	title: {
		marginBottom: '2rem',
		marginTop: '3rem',
		fontWeight: 700
	},
	subtitle: {
		fontWeight: 700,
		marginBottom: '1rem',
		marginTop: '3rem'
	},
	startButton: {
		marginTop: '2rem',
		paddingTop: '0.7rem',
		paddingBottom: '0.7rem',
		paddingRight: '1.5rem',
		paddingLeft: '1.5rem'
	},

	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		// marginTop: '1rem',
		marginBottom: '1rem',
		alignItems: 'center'
	},
	submitButtonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: '3rem',
		marginBottom: '1rem',
		alignItems: 'center'
	},
	nextButton: {
		paddingTop: '0.7rem',
		paddingBottom: '0.7rem'
	},
	section: {
		textAlign: 'center'
	},
	sectionReview: {
		marginTop: '2rem',
		textAlign: 'start'
	},
	completedIcon: {
		fontSize: '10rem',
		marginBottom: '2rem'
	},
	confetti: {
		marginLeft: '50%'
	},
	titlemitText: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});

//MUTATION: IF RESULT.X => SEND RESULT BASED ON ID

const DialogCompleteSurvey = ({ selectedSurvey, isOpen, close }) => {
	const { id, hasResult, isNewForDoctor, selected, results } = selectedSurvey;
	const classes = useStyles();
	console.log(id, selected);
	const [ reasonForVisit, setReasonForVisit ] = useState(null);
	const [ symptomTime, setSymptomTime ] = useState(null);
	const [ oxygenSaturation, setOxygenStaturation ] = useState(null);
	const [ temperature, setTemperature ] = useState(null);
	const [ tempUnit, setTempUnit ] = useState(null);
	const [ symptomTimeUnit, setSymptomTimeUnit ] = useState(null);
	const [ isTakingMeds, setIsTakingMeds ] = useState(false);
	const [ hasDrugAllergies, setHasDrugAllergies ] = useState(false);
	const [ symptoms, setSymptoms ] = useState({
		difficultySleeping: false,
		fatigue: false,
		fever: false,
		lossOfAppetite: false,
		moodChanges: false,
		nightSweats: false,
		weightChange: false,
		congestion: false,
		difficultySwallowing: false,
		earDrainage: false,
		earPain: false,
		eyeRedness: false,
		noseBleed: false,
		soreThroat: false,
		headache: false,
		hearingLoss: false,
		nasalDischarge: false,
		chestPain: false,
		cough: false,
		decreasedExerciseTolerance: false,
		palpitations: false,
		shortnessOfBreath: false,
		phlegm: false,
		wheezing: false,
		abdominalPain: false,
		bloodInStool: false,
		constipation: false,
		diarrhea: false,
		heartburn: false,
		nausea: false,
		bloodInUrine: false,
		discomfortUrination: false,
		frequentUrination: false,
		irregularPeriods: false,
		vaginalBleeding: false,
		vaginalDischarge: false,
		dizzy: false,
		lossOfConsciousness: false,
		memoryLoss: false,
		numbness: false,
		tremors: false,
		visionChanges: false,
		bites: false,
		bleeding: false,
		bruising: false,
		itching: false,
		skinRashes: false,
		sores: false,
		swelling: false,
		backPain: false,
		jointStiffness: false,
		limitedMobility: false,
		musclePain: false,
		muscleWeakness: false,
		muscleSwelling: false
	});
	const [ medConditions, setMedConditions ] = useState({
		abnormalThyroid: false,
		anxiety: false,
		arthritis: false,
		asthma: false,
		cancer: false,
		cronicKidneyDisease: false,
		chronicPain: false,
		COPD: false,
		depression: false,
		diabetes: false,
		foreignTravel: false,
		heartDisease: false,
		hemophilia: false,
		highBloodPressure: false,
		highCholesterol: false,
		historyOfFainting: false,
		historyOfFalls: false,
		historyOfSkinCancer: false,
		historyOfSTD: false,
		historyOfStroke: false,
		hospitalized: false,
		insomnia: false,
		ironDeficiency: false,
		jointReplacement: false,
		nicotineDependance: false,
		obesity: false,
		prediabetes: false,
		pregnant: false,
		rheumatoidArthritis: false,
		seasonalAllergies: false,
		titlestanceAbuse: false
	});

	const handleChange = (event) => {
		setSymptoms({ ...symptoms, [event.target.name]: event.target.checked });
	};
	const handleChangeMedCondition = (event) => {
		setMedConditions({ ...medConditions, [event.target.name]: event.target.checked });
	};
	const submitForm = (e) => {
		e.preventDefault();
		//ISNEWFORDOCTOR = TRUE
		//HASRESULT = TRUE
		//IF RESULT EXISTS => SEND RESULT
	};
	console.log(hasDrugAllergies);
	return (
		<Dialog
			fullScreen
			open={isOpen}
			onClose={close}
			aria-labelledby="appointment-detail"
			aria-describedby="appointment-detail"
		>
			<Container maxWidth="md" className={classes.layout}>
				<div className={classes.buttonWrapper}>
					<ButtonNoBorder onClick={close}>
						<ArrowBackIcon />
						<Typography>Back to my profile</Typography>
					</ButtonNoBorder>
				</div>
				<Divider className={classes.divider} />
				<Grid container className={classes.container}>
					<Typography className={classes.title} variant="h5">
						Please respond to a few questions to get you the best care!
					</Typography>
					<form onSubmit={submitForm}>
						{selected && (
							<div>
								{selected.reason && (
									<Container maxWidth="sm" className={classes.section}>
										<Typography className={classes.subtitle} variant="h5" color="primary">
											What is the reason for your visit?
										</Typography>
										<FormReason
											reasonForVisit={reasonForVisit}
											setReasonForVisit={setReasonForVisit}
										/>
										<Typography className={classes.subtitle} variant="h5" color="primary">
											How long have you felt this way?
										</Typography>
										<FormDuration
											symptomTime={symptomTime}
											symptomTimeUnit={symptomTimeUnit}
											setSymptomTime={setSymptomTime}
											setSymptomTimeUnit={setSymptomTimeUnit}
										/>
									</Container>
								)}
								{selected.symptoms && (
									<Container maxWidth="sm" className={classes.section}>
										<Typography className={classes.subtitle} variant="h5" color="primary">
											Do you have any of these symptoms?
										</Typography>
										<FormSymptoms symptoms={symptoms} handleChange={handleChange} />
									</Container>
								)}
								{selected.healthProfile && (
									<Container maxWidth="sm" className={classes.section}>
										<Typography className={classes.subtitle} variant="h5" color="primary">
											Complete your health profile
										</Typography>

										<FormHealthProfile
											isTakingMeds={isTakingMeds}
											setIsTakingMeds={setIsTakingMeds}
											hasDrugAllergies={hasDrugAllergies}
											setHasDrugAllergies={setHasDrugAllergies}
											medConditions={medConditions}
											handleChangeMedCondition={handleChangeMedCondition}
										/>
									</Container>
								)}
								{selected.oxygen && (
									<Container maxWidth="sm" className={classes.section}>
										<Typography className={classes.subtitle} variant="h5" color="primary">
											Add your oxygen level
										</Typography>
										<FormOxygen
											oxygenSaturation={oxygenSaturation}
											setOxygenStaturation={setOxygenStaturation}
										/>
									</Container>
								)}
								{selected.temperature && (
									<Container maxWidth="sm" className={classes.section}>
										<Typography className={classes.subtitle} variant="h5" color="primary">
											Add your temperature
										</Typography>
										<FormTemperature
											temperature={temperature}
											tempUnit={tempUnit}
											setTemperature={setTemperature}
											setTempUnit={setTempUnit}
										/>
									</Container>
								)}
							</div>
						)}
						<Grid container className={classes.submitButtonWrapper}>
							<Grid item xs={5} sm={3}>
								<ButtonFilled fullWidth className={classes.nextButton} type="submit">
									Submit
								</ButtonFilled>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Container>
		</Dialog>
	);
};
export default DialogCompleteSurvey;
