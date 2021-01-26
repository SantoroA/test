import React, { useState } from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import { NavLink } from 'react-router-dom';
import FormUserReason from '../../components/groups/FormUserReason';
import FormUserInsurance from '../../components/groups/FormUserInsurance';
import FormSymptoms from '../../components/groups/FormSymptoms';
import FormUserRecommendation from '../../components/groups/FormUserRecommendation';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
import ButtonNoBorder from '../../components/customUi/ButtonNoBorder';
import TextInputRounder from '../../components/customUi/TextInputRounder';
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles({
	container: {
		textAlign: 'center',
		justifyContent: 'center',
		marginTop: '3rem'
	},
	backButton: {
		textDecoration: 'none',
		display: 'flex',
		flexDirection: 'row',
		color: '#07B597',
		marginTop: '2rem',
		marginBottom: '2rem'
	},
	title: {
		marginBottom: '2rem',
		fontWeight: 700
	},
	sub: {
		fontWeight: 700,
		marginBottom: '1rem'
	},
	startButton: {
		marginTop: '2rem',
		paddingTop: '0.7rem',
		paddingBottom: '0.7rem',
		paddingRight: '1.5rem',
		paddingLeft: '1.5rem'
	},
	progress: {
		marginBottom: '2rem',
		marginRight: '2rem',
		marginLeft: '2rem',
		height: 10,
		borderRadius: 5,
		'& .MuiLinearProgress-bar': {
			borderRadius: 5
		}
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	optionsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: '1rem'
	},
	nextButton: {
		paddingTop: '1rem',
		paddingBottom: '1rem'
	},
	symptomSection: {
		marginTop: '1rem',
		padding: '1rem'
	}
});

const PatReserveScreen = (props) => {
	const appointmentId = props.location.state.appointmentId;
	const classes = useStyles();
	const [ step, setStep ] = useState(1);
	const [ isMainPatient, setIsMainPatient ] = useState(true);
	const [ insuranceType, setInsuranceType ] = useState('');
	const [ reasonForVisit, setReasonForVisit ] = useState('');
	const [ symptomTime, setSymptomTime ] = useState('');
	const [ symptoms, setSymptoms ] = useState({
		difficultySleeping: true,
		fatigue: true,
		fever: false,
		lossOfAppetite: false,
		moodChanges: false,
		nightSweats: false,
		weightChange: false,
		congestion: false,
		difficultySwallowing: false,
		earDrainage: true,
		earPain: false,
		eyeRedness: true,
		noseBleed: false,
		soreThroat: true,
		headache: false,
		hearingLoss: true,
		nasalDischarge: false,
		chestPain: false,
		cough: true,
		decreasedExerciseTolerance: false,
		palpitations: true,
		shortnessOfBreath: true,
		phlegm: true,
		wheezing: true,
		abdominalPain: true,
		bloodInStool: false,
		constipation: true,
		diarrhea: true,
		heartburn: true,
		nausea: false,
		bloodInUrine: true,
		discomfortUrination: false,
		frequentUrination: true,
		irregularPeriods: false,
		vaginalBleeding: false,
		vaginalDischarge: false,
		dizzy: true,
		lossOfConsciousness: false,
		memoryLoss: true,
		numbness: true,
		tremors: false,
		visionChanges: false,
		bites: false,
		bleeding: true,
		bruising: true,
		itching: false,
		skinRashes: false,
		sores: true,
		swelling: false,
		backPain: true,
		jointStiffness: false,
		limitedMobility: true,
		musclePain: false,
		muscleWeakness: true,
		muscleSwelling: true
	});

	const nextStep = () => {
		setStep(step + 1);
	};

	const previousStep = () => {
		setStep(step - 1);
	};

	const handleChange = (event) => {
		setSymptoms({ ...symptoms, [event.target.name]: event.target.checked });
	};

	switch (step) {
		case 1:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<NavLink to="/in/patient/doctorsearch" className={classes.backButton}>
							<ButtonNoBorder onClick={() => {}}>
								<ArrowBackIcon />
								<Typography>Back</Typography>
							</ButtonNoBorder>
						</NavLink>
						<Typography className={classes.title} color="primary" variant="h3">
							Now we want to know more about you!
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={1} />
						<Typography className={classes.sub} variant="h5">
							Please respond to a few questions to get you the best care!
						</Typography>
						<Typography color="textSecondary" variant="body1">
							The appointment will hold for the next 20 minutes
						</Typography>
						<ButtonFilled onClick={nextStep} className={classes.startButton}>
							Ok, Got it!
						</ButtonFilled>
					</Container>
				</PatLayoutContainer>
			);
		case 2:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							What is the reason for the visit?
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={1} />
						<Container maxWidth="sm">
							<Grid className={classes.optionsWrapper} container>
								<Grid item sm={8}>
									<TextInputRounder
										fullWidth
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
									</TextInputRounder>
								</Grid>
								<Grid item sm={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 3:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							How long have you felt this way?
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={10} />
						<Container maxWidth="sm">
							<Grid className={classes.optionsWrapper} container>
								<Grid item sm={4}>
									<TextField
										type="number"
										fullWidth
										label="Amount"
										value={symptomTime}
										variant="outlined"
										onChange={(e) => setSymptomTime(e.target.value)}
									/>
								</Grid>
								<Grid item sm={4}>
									<TextField
										type="number"
										fullWidth
										label="Unit"
										select
										value={symptomTime}
										variant="outlined"
										onChange={(e) => setSymptomTime(e.target.value)}
									>
										<MenuItem value="hours">Hours</MenuItem>
										<MenuItem value="weeks">Weeks</MenuItem>
										<MenuItem value="months">Months</MenuItem>
									</TextField>
								</Grid>
								<Grid item sm={3}>
									<ButtonFilled className={classes.nextButton} fullWidth onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 4:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Do you have any of these symptoms?
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={20} />
						<Typography color="textSecondary" variant="body1">
							Please select all that apply
						</Typography>
						<Container maxWidth="sm">
							<FormSymptoms symptoms={symptoms} handleChange={handleChange} />
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 5:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Complete your health profile
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={40} />

						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 6:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Add your oxigen saturation level
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={50} />
						<Typography color="textSecondary" variant="body1">
							If you have a pulse oximeter, save time by measuring you current oxygen saturation before
							your visit
						</Typography>
						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 7:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Add your temperature
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={60} />
						<Typography color="textSecondary" variant="body1">
							If you have a thermometer, adding your temperature now will save time during your visit. No
							guessing please!
						</Typography>
						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 8:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Add other details
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={70} />
						<Typography color="textSecondary" variant="body1">
							Please incluse any other detail you want to tell the doctor
						</Typography>
						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 9:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Here are your appointment details!
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={80} />
						<Typography className={classes.sub} variant="h5">
							Review and confirm
						</Typography>
						<Typography color="textSecondary" variant="body1">
							The appointment will be added to your Bookings in your profile once the payment is confirmed
						</Typography>
						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
		case 10:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Add Payment Method
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={90} />

						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);

		default:
			return (
				<PatLayoutContainer>
					<Container className={classes.container} maxWidth="md">
						<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
							<ArrowBackIcon />
							<Typography>Back</Typography>
						</ButtonNoBorder>

						<Typography className={classes.title} color="primary" variant="h3">
							Completed
						</Typography>
						<LinearProgress className={classes.progress} variant="determinate" value={100} />

						<Container maxWidth="sm">
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={3}>
									<ButtonFilled fullWidth className={classes.nextButton} onClick={nextStep}>
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</Container>
					</Container>
				</PatLayoutContainer>
			);
	}
};

export default PatReserveScreen;
