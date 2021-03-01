import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';
import StepWizardContainer from '../../components/layout/StepWizardContainer';
import CardAppointment from '../../components/groups/CardAppointment';
import { formatDateDisplay } from '../../helpers/dateHelper';
import Confetti from 'react-dom-confetti';
import ErrorMessage from '../../components/groups/ErrorMessage';
import { useMutation, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import FormReason from '../../components/groups/FormsSurvey/reason';
import FormSymptoms from '../../components/groups/FormsSurvey/symptoms';
import FormDuration from '../../components/groups/FormsSurvey/duration';
import FormHealthProfile from '../../components/groups/FormsSurvey/healthProfile';
import FormOxygen from '../../components/groups/FormsSurvey/oxygen';
import FormTemperature from '../../components/groups/FormsSurvey/temperature';
//CUSTOM UI
import ButtonFilled from '../../components/customUi/ButtonFilled';
import ButtonNoBorder from '../../components/customUi/ButtonNoBorder';
//CUSTOM ICONS
import CompletedIcon from '../../components/customIcons/CompletedIcon';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
	skipButton: {
		color: 'rgba(160, 164, 168, 1)',
		'&:hover': {
			color: '#07B597'
		}
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

	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '1.5rem',
		marginBottom: '1rem',
		alignItems: 'center'
	},
	nextButton: {
		paddingTop: '0.7rem',
		paddingBottom: '0.7rem'
	},
	section: {
		marginTop: '2rem'
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
	submitText: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	}
});

const APPOINTMENTSRESERVE_MUTATION = gql`
	mutation AppointmentAdd(
		$idApt: ID!
		$idPatient: ID!
		$reasonForVisit: String!
		$symptomTime: String
		$symptomTimeUnit: String
		$isTakingMeds: Boolean
		$hasDrugAllergies: Boolean
		$oxygenSaturation: String
		$temperature: String
		$tempUnit: String
		$otherInfo: String
		$medCondition: [String]
		$symptoms: [String]
	) {
		appointmentAdd(
			idApt: $idApt
			idPatient: $idPatient
			reasonForVisit: $reasonForVisit
			symptomTime: $symptomTime
			symptomTimeUnit: $symptomTimeUnit
			isTakingMeds: $isTakingMeds
			hasDrugAllergies: $hasDrugAllergies
			oxygenSaturation: $oxygenSaturation
			temperature: $temperature
			tempUnit: $tempUnit
			otherInfo: $otherInfo
			medCondition: $medCondition
			symptoms: $symptoms
		)
	}
`;

const PatReserveScreen = (props) => {
	const { apDoc, appointment } = props.location.state;
	const dateDisplay = formatDateDisplay(appointment.start);
	const [ confettiTrigger, setConfettiTrigger ] = useState(false);
	const { state: { userId } } = useContext(AuthContext);
	const classes = useStyles();
	const [ step, setStep ] = useState(1);
	const [ medArr, setMedArr ] = useState([]);
	const [ symptomsArr, setSymptomsArr ] = useState([]);
	const [ reasonForVisit, setReasonForVisit ] = useState('');
	const [ symptomTime, setSymptomTime ] = useState('');
	const [ symptomTimeUnit, setSymptomTimeUnit ] = useState('');
	const [ isTakingMeds, setIsTakingMeds ] = useState(false);
	const [ hasDrugAllergies, setHasDrugAllergies ] = useState(false);
	const [ oxygenSaturation, setOxygenStaturation ] = useState('');
	const [ temperature, setTemperature ] = useState('');
	const [ tempUnit, setTempUnit ] = useState('');
	const [ otherInfo, setOtherInfo ] = useState('');
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
		substanceAbuse: false
	});

	const [ appointmentAdd, { data, error, loading } ] = useMutation(APPOINTMENTSRESERVE_MUTATION, {
		variables: {
			reasonForVisit,
			symptomTime,
			symptomTimeUnit,
			isTakingMeds,
			hasDrugAllergies,
			oxygenSaturation,
			temperature,
			tempUnit,
			otherInfo,
			symptoms: symptomsArr,
			medCondition: medArr,
			idPatient: userId,
			idApt: appointment.idApt
		}
	});
	console.log(error);
	console.log(data);
	const nextStep = () => {
		setStep(step + 1);
	};

	const previousStep = () => {
		setStep(step - 1);
	};

	const handleChange = (event) => {
		let newSymptom = symptomsArr.indexOf(event.target.name);
		newSymptom > -1
			? setSymptomsArr(symptomsArr.filter((el) => el !== event.target.name))
			: setSymptomsArr([ ...symptomsArr, event.target.name ]);
		setSymptoms({ ...symptoms, [event.target.name]: event.target.checked });
	};
	const handleChangeMedCondition = (event) => {
		let newCondition = medArr.indexOf(event.target.name);
		newCondition > -1
			? setMedArr(medArr.filter((el) => el !== event.target.name))
			: setMedArr([ ...medArr, event.target.name ]);
		setMedConditions({ ...medConditions, [event.target.name]: event.target.checked });
	};

	console.log(apDoc);
	console.log('reserve', data);
	// if (error) {
	// 	return (
	// 		<PatLayoutContainer>
	// 			<Container className={classes.container} maxWidth="md">
	// 				<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
	// 					<ArrowBackIcon />
	// 					<Typography>Back</Typography>
	// 				</ButtonNoBorder>
	// 				<Typography>Something went wrong. Please try again later</Typography>
	// 			</Container>
	// 		</PatLayoutContainer>
	// 	);
	// }

	switch (step) {
		case 1:
			return (
				<StepWizardContainer
					step={1}
					previousStep={previousStep}
					title="Now we want to know more about you!"
					progress={1}
				>
					<Typography className={classes.sub} variant="h5">
						Please respond to a few questions to get you the best care!
					</Typography>
					<Typography color="textSecondary" variant="body1">
						The appointment will hold for the next 20 minutes
					</Typography>
					<ButtonFilled onClick={nextStep} className={classes.startButton}>
						Ok, Got it!
					</ButtonFilled>
				</StepWizardContainer>
			);
		case 2:
			return (
				<StepWizardContainer
					step={2}
					previousStep={previousStep}
					title="What is the reason for the visit?"
					progress={1}
				>
					<FormReason
						onSubmitForm={nextStep}
						reasonForVisit={reasonForVisit}
						setReasonForVisit={setReasonForVisit}
						submitText={
							<div className={classes.submitText}>
								<Typography>Next</Typography>
								<NavigateNextIcon />
							</div>
						}
					/>
				</StepWizardContainer>
			);
		case 3:
			return (
				<StepWizardContainer
					step={3}
					previousStep={previousStep}
					title="How long have you felt this way?"
					progress={15}
				>
					<FormDuration
						onSubmitForm={nextStep}
						symptomTime={symptomTime}
						symptomTimeUnit={symptomTimeUnit}
						setSymptomTime={setSymptomTime}
						setSymptomTimeUnit={setSymptomTimeUnit}
						submitText={
							<div className={classes.submitText}>
								<Typography>Next</Typography>
								<NavigateNextIcon />
							</div>
						}
					/>
				</StepWizardContainer>
			);
		case 4:
			return (
				<StepWizardContainer
					step={4}
					previousStep={previousStep}
					title="Do you have any of these symptoms?"
					progress={30}
				>
					<FormSymptoms
						submitText={
							<div className={classes.submitText}>
								<Typography>Next</Typography>
								<NavigateNextIcon />
							</div>
						}
						symptoms={symptoms}
						onSubmitForm={nextStep}
						handleChange={handleChange}
					/>
				</StepWizardContainer>
			);
		case 5:
			return (
				<StepWizardContainer
					step={5}
					previousStep={previousStep}
					title="Complete your health profile"
					progress={45}
				>
					<FormHealthProfile
						onSubmitForm={nextStep}
						isTakingMeds={isTakingMeds}
						setIsTakingMeds={setIsTakingMeds}
						submitText={
							<div className={classes.submitText}>
								<Typography>Next</Typography>
								<NavigateNextIcon />
							</div>
						}
						hasDrugAllergies={hasDrugAllergies}
						setHasDrugAllergies={setHasDrugAllergies}
						medConditions={medConditions}
						handleChangeMedCondition={handleChangeMedCondition}
					/>
				</StepWizardContainer>
			);
		case 6:
			return (
				<StepWizardContainer
					step={6}
					previousStep={previousStep}
					title="Add your oxygen saturation level"
					progress={60}
				>
					<FormOxygen
						onSubmitForm={nextStep}
						submitText={
							<div className={classes.submitText}>
								<Typography>Next</Typography>
								<NavigateNextIcon />
							</div>
						}
						oxygenSaturation={oxygenSaturation}
						setOxygenStaturation={setOxygenStaturation}
					/>
				</StepWizardContainer>
			);
		case 7:
			return (
				<StepWizardContainer step={7} previousStep={previousStep} title="Add your temperature" progress={75}>
					<FormTemperature
						onSubmitForm={nextStep}
						submitText={
							<div className={classes.submitText}>
								<Typography>Next</Typography>
								<NavigateNextIcon />
							</div>
						}
						temperature={temperature}
						tempUnit={tempUnit}
						setTemperature={setTemperature}
						setTempUnit={setTempUnit}
					/>
				</StepWizardContainer>
			);
		case 8:
			return (
				<StepWizardContainer step={8} previousStep={previousStep} title="Add other details" progress={90}>
					<Typography color="textSecondary" variant="body1">
						Please incluse any other detail you want to tell the doctor
					</Typography>
					<Container maxWidth="sm">
						<form onSubmit={nextStep}>
							<Grid container className={classes.section}>
								<TextField
									rows={4}
									multiline
									fullWidth
									value={otherInfo}
									onChange={(e) => setOtherInfo(e.target.value)}
									variant="outlined"
									placeholder="please type here any extra information that you want the doctor to know..."
								/>
							</Grid>
							<Grid container className={classes.buttonWrapper}>
								<Grid item xs={5} sm={3}>
									<ButtonNoBorder className={classes.skipButton} onClick={nextStep}>
										<Typography>Skip question</Typography>
									</ButtonNoBorder>
								</Grid>
								<Grid item xs={5} sm={3}>
									<ButtonFilled fullWidth className={classes.nextButton} type="submit">
										Next <NavigateNextIcon />
									</ButtonFilled>
								</Grid>
							</Grid>
						</form>
					</Container>
				</StepWizardContainer>
			);
		case 9:
			return (
				<StepWizardContainer
					step={10}
					previousStep={previousStep}
					title="Here are your appointment details!"
					progress={100}
				>
					<Typography className={classes.sub} variant="h5">
						Review and confirm
					</Typography>
					<Typography color="textSecondary" variant="body1">
						The appointment will be added to your Bookings in your profile once the payment is confirmed
					</Typography>
					<Container maxWidth="sm" className={classes.sectionReview}>
						<Typography variant="subtitle1">SHOWING APPOINTMENT FOR</Typography>
						<Typography color="primary" className={classes.sub} variant="h5">
							{dateDisplay}
						</Typography>
						<CardAppointment
							state={{
								appointment: {
									amount: appointment.amount,
									end: appointment.end,
									id: appointment.id,
									idApt: appointment.idApt,
									start: appointment.start
								},
								name: apDoc.lastName,
								pic: apDoc.pic,
								buttonText: 'Book',
								title: 'Doctor'
							}}
							showPrice={true}
							onSubmit={(e) => {
								e.preventDefault();
								appointmentAdd().catch((err) => console.log(err));
								nextStep();
								setTimeout(() => {
									setConfettiTrigger(true);
								}, 500);
								setTimeout(() => {
									setConfettiTrigger(false);
								}, 2000);
							}}
						/>
					</Container>
				</StepWizardContainer>
			);

		default:
			return (
				<PatLayoutContainer>
					{loading && (
						<Container className={classes.container} maxWidth="md">
							<Loader type="TailSpin" color="primary" height={80} width={80} />
						</Container>
					)}
					{error && (
						<Container className={classes.container} maxWidth="md">
							<ButtonNoBorder onClick={previousStep} className={classes.backButton}>
								<ArrowBackIcon />
								<Typography>Back</Typography>
							</ButtonNoBorder>
							<ErrorMessage />
						</Container>
					)}
					{data && (
						<Container className={classes.container} maxWidth="md">
							<Typography className={classes.title} color="primary" variant="h3">
								Completed
							</Typography>
							<Confetti
								className={classes.confetti}
								active={confettiTrigger}
								config={{
									angle: 90,
									spread: 100,
									startVelocity: 150,
									elementCount: 400,
									dragFriction: 0.5,
									duration: 4000,
									stagger: 30,
									width: '10px',
									height: '10px',
									perspective: '1000px',
									colors: [ '#45B688', '#4360A8', '#31C8E0' ]
								}}
							/>

							<CompletedIcon className={classes.completedIcon} />
							<Typography color="textSecondary" variant="body2">
								The appointment has been added to your Bookings in your profile.
							</Typography>
							<Container maxWidth="sm" className={classes.sectionReview}>
								<Typography variant="subtitle1">SHOWING APPOINTMENT FOR</Typography>
								<Typography color="primary" className={classes.sub} variant="h5">
									{dateDisplay}
								</Typography>
								<CardAppointment
									state={{
										appointment: appointment,
										name: apDoc.lastName,
										pic: apDoc.pic,
										buttonText: 'View',
										title: 'Doctor'
									}}
									onSubmit={nextStep}
								/>
							</Container>
						</Container>
					)}
				</PatLayoutContainer>
			);
	}
};

export default PatReserveScreen;
