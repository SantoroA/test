import React, { useState, useContext } from 'react';
import { formatDateShort, convertTime } from '../../helpers/dateHelper';
import { Context as AuthContext } from '../../context/AuthContext';
import { SURVEY_QUERY } from '../../context/GraphQl/graphQlQuery';
import { useQuery, gql, useMutation } from '@apollo/client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import dianurseApi from '../../api/dianurseApi';
import ErrorMessage from './ErrorMessage';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		padding: '1rem'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title: {
		fontWeight: 'bold'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	},
	section: {
		paddingBottom: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	root: {
		padding: '1rem'
	},
	surveySection: {
		padding: '1.5rem'
	},
	column: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	label: {
		'& .MuiFormControlLabel-label': {
			textAlign: 'start'
		}
	}
});

const MYAPPOINTMENTS_QUERY = gql`
	query GetAppointments($id: ID!) {
		patientAppointmentsForUpload(id: $id) {
			_id
			appointmentTimeStart
			profileHCPid {
				firstName
				lastName
			}
			accountHCPid {
				profilePicture
			}
		}
	}
`;

const SURVEYDOCTORADD_MUTATION = gql`
	mutation AddSurvey($idApt: ID!, $selected: Selected) {
		doctorAddNewSurvey(idApt: $idApt, selected: $selected)
	}
`;

//MUTATION TO SEND SURVEY REQUEST
//PUSH INTO SURVEYS ARRAY > selected = surveysSelected, isNewForPatient = true, isNewForDoctor = false, hasResult = false

const DialogNewSurvey = ({ isOpen, close, idHCP, idPatient, refetch }) => {
	const { state: { userId } } = useContext(AuthContext);
	const [ hasError, setHasError ] = useState(false);
	const [ appointmentSelectedId, setAppointmentSelectedId ] = useState('');
	const { loading, error, data } = useQuery(SURVEY_QUERY, {
		variables: { idHCP: userId, idPatient }
	});
	const [ doctorAddNewSurvey ] = useMutation(SURVEYDOCTORADD_MUTATION, {});

	const [ surveysSelected, setSurveysSelected ] = useState({
		reason: false,
		healthProfile: false,
		oxygen: false,
		symptoms: false,
		temperature: false
	});

	const handleCheck = (event) => {
		setSurveysSelected({ ...surveysSelected, [event.target.name]: event.target.checked });
	};

	console.log(userId);
	const appointments = [
		{
			_id: '60196388539b8sdf800272f3a36',
			appointmentTimeStart: new Date(),
			profileHCPid: {
				lastName: 'Green'
			},
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/6204377/pexels-photo-6204377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			}
		},
		{
			_id: '60196388539bsdf88002sdc72f3a36',
			appointmentTimeStart: new Date(),
			profileHCPid: {
				lastName: 'Blue'
			},
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/4484145/pexels-photo-4484145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			}
		},
		{
			_id: '6019638qw8539bdsv8800272f3a36',
			appointmentTimeStart: new Date(),
			profileHCPid: {
				lastName: 'Red'
			},
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/704977/pexels-photo-704977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			}
		},
		{
			_id: '6019ffe63885rg39bdsv8800272f3a36',
			appointmentTimeStart: new Date(),
			profileHCPid: {
				lastName: 'Purple'
			},
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/6496035/pexels-photo-6496035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			}
		},
		{
			_id: '601963885qwefg39bdsv8800272f3a36',
			appointmentTimeStart: new Date(),
			profileHCPid: {
				lastName: 'Orange'
			},
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/6033988/pexels-photo-6033988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			}
		},
		{
			_id: '60196388539bdsawv8800272f3a36',
			appointmentTimeStart: new Date(),
			profileHCPid: {
				lastName: 'Yellow'
			},
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/6641336/pexels-photo-6641336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			}
		}
	];

	const classes = useStyles();

	return (
		<Dialog
			open={isOpen}
			className={classes.root}
			onClose={() => {
				close();
				setHasError(false);
			}}
			aria-labelledby="upload-document"
			aria-describedby="upload-document"
		>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					try {
						await doctorAddNewSurvey({
							variables: {
								idApt: appointmentSelectedId,
								selected: surveysSelected
							}
						});
						refetch();
						close();
					} catch (err) {
						console.log(err);
						setHasError(true);
					}
				}}
			>
				<Grid container className={classes.wrapper}>
					<Grid item className={classes.header}>
						<Typography className={classes.title}>Request Survey</Typography>
						<IconButton onClick={close} color="primary">
							<CloseIcon />
						</IconButton>
					</Grid>
					<Divider className={classes.divider} />
					{loading && (
						<Container className={classes.emptyState}>
							<Loader type="TailSpin" color="primary" height={80} width={80} />
						</Container>
					)}
					{(error || hasError) && <ErrorMessage />}
					{data && (
						<div>
							<Grid className={classes.section} item>
								<FormControl variant="outlined" fullWidth required>
									<InputLabel id="apt-select-label">Select Appoitment</InputLabel>
									<Select
										labelId="apt-select-label"
										value={appointmentSelectedId}
										onChange={(e) => setAppointmentSelectedId(e.target.value)}
										label="Select Appointment"
									>
										{data.doctorSurvey.map((apt, i) => {
											return (
												<MenuItem key={i} value={apt._id}>
													{formatDateShort(apt.appointmentTimeStart)} -{' '}
													{convertTime(apt.appointmentTimeStart)}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>

							<Grid className={classes.section} item>
								<Typography color="textSecondary">Select all that apply*</Typography>
								<PaperCustomShadow className={classes.surveySection}>
									<Grid container>
										<Grid sm={6} className={classes.column} item>
											<FormControl component="fieldset">
												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={surveysSelected.symptoms}
																onChange={handleCheck}
																name="symptoms"
															/>
														}
														className={classes.label}
														label="Symptoms"
													/>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={surveysSelected.oxygen}
																onChange={handleCheck}
																name="oxygen"
															/>
														}
														className={classes.label}
														label="Saturation level"
													/>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={surveysSelected.temperature}
																onChange={handleCheck}
																name="temperature"
															/>
														}
														className={classes.label}
														label="Temperature"
													/>
												</FormGroup>
											</FormControl>
										</Grid>
										<Grid sm={6} className={classes.column} item>
											<FormControl component="fieldset">
												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={surveysSelected.reason}
																onChange={handleCheck}
																name="reason"
															/>
														}
														className={classes.label}
														label="Reason for visit"
													/>
													<FormControlLabel
														control={
															<Checkbox
																color="primary"
																checked={surveysSelected.healthProfile}
																onChange={handleCheck}
																name="healthProfile"
															/>
														}
														className={classes.label}
														label="Health Profile"
													/>
												</FormGroup>
											</FormControl>
										</Grid>
									</Grid>
								</PaperCustomShadow>
							</Grid>
							<Grid className={classes.section} item>
								<ButtonFilled fullWidth type="submit">
									Request
								</ButtonFilled>
							</Grid>
						</div>
					)}
				</Grid>
			</form>
		</Dialog>
	);
};

export default DialogNewSurvey;
