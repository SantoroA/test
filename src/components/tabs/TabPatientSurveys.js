import React, { useState, useContext } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { useQuery, gql, useMutation } from '@apollo/client';
import { SURVEY_QUERY } from '../../context/GraphQl/graphQlQuery';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
import DialogNewSurvey from '../groups/DialogNewSurvey';
import DialogConfirm from '../groups/DialogConfirm';
import DialogViewSurveyResult from '../groups/DialogViewSurveyResult';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '1rem',
		alignItems: 'center'
	},
	uploadButton: {
		paddingTop: '0.6rem',
		paddingBottom: '0.6rem',
		paddingRight: '1rem',
		paddingLeft: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	paper: {
		marginBottom: '0.5rem'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem'
	},
	iconsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	errorIcon: {
		color: '#FF9900',
		marginLeft: '0.5rem',
		marginRight: '0.5rem'
	},
	checkIcon: {
		marginLeft: '0.5rem',
		marginRight: '0.5rem'
	}
});

const VIEW_MUTATION = gql`
	mutation UpdateSurveyView($idApt: ID!, $idSurvey: ID!) {
		doctorViewSurvey(idApt: $idApt, idSurvey: $idSurvey)
	}
`;

const DELETE_MUTATION = gql`
	mutation DeleteSurvey($idApt: ID!, $idSurvey: ID!) {
		doctorRemoveSurvey(idApt: $idApt, idSurvey: $idSurvey)
	}
`;

//MAIN FUNCTION

const TabPatientSurveys = ({ idHCP, idPatient }) => {
	const [ dialogSurveyOpen, setDialogSurveyOpen ] = useState(false);
	const { state: { lastName, image } } = useContext(DocProfileContext);
	const [ selectedSurvey, setSelectedSurvey ] = useState({});
	const [ dialogViewResultOpen, setDialogViewResultOpen ] = useState(false);
	const [ dialogConfirmOpen, setDialogConfirmOpen ] = useState(false);
	const [ deleteId, setDeleteId ] = useState('');
	const [ surveyId, setSurveyId ] = useState('');
	const classes = useStyles();
	// const { loading, error, data, refetch } = useQuery(SURVEY_QUERY, {
	// 	variables: {
	// 		idHCP,
	// 		idPatient
	// 	}
	// });
	const [ doctorViewSurvey ] = useMutation(VIEW_MUTATION, {
		refetchQueries: () => [
			{
				query: SURVEY_QUERY,
				variables: {
					idHCP,
					idPatient
				}
			}
		]
	});
	const [ doctorRemoveSurvey ] = useMutation(DELETE_MUTATION, {
		refetchQueries: () => [
			{
				query: SURVEY_QUERY,
				variables: {
					idHCP,
					idPatient
				}
			}
		]
	});

	const data = {
		doctorSurvey: [
			{
				surveys: [
					{
						selected: {
							reason: true,
							healthProfile: true,
							oxygen: true,
							symptoms: true,
							temperature: true
						},
						results: {
							reasonForVisit: 'headche',
							symptomTime: '3',
							symptomTimeUnit: 'weeks',
							isTakingMeds: 'yes',
							hasDrugAllergies: 'no',
							oxygenSaturation: '98',
							temperature: '36',
							tempUnit: 'celsius',
							otherInfo: '',
							symptoms: {
								difficultySleeping: false,
								fatigue: true,
								fever: false,
								lossOfAppetite: false,
								moodChanges: true,
								nightSweats: true,
								weightChange: true,
								congestion: false,
								difficultySwallowing: false,
								earDrainage: false
							},
							medConditions: []
						},
						hasResult: true,
						id: 'sadas',
						isNewForDoctor: false
					},
					{
						selected: {
							reason: false,
							healthProfile: false,
							oxygen: false,
							symptoms: true,
							temperature: true
						},
						results: {
							reasonForVisit: '',
							symptomTime: '',
							symptomTimeUnit: '',
							isTakingMeds: '',
							hasDrugAllergies: '',
							oxygenSaturation: '',
							temperature: '',
							tempUnit: '',
							otherInfo: '',
							symptoms: [],
							medConditions: []
						},
						hasResult: true,
						id: 'sadasdfg',
						isNewForDoctor: false
					}
				],
				appointmentTimeStart: '2021-02-01T06:30:00.000Z',
				profileHCPid: {
					firstName: 'Peach',
					lastName: 'Pizza'
				},
				accountHCPid: {
					profilePicture:
						'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
				},
				appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
				status: ''
			},
			{
				surveys: [
					{
						selected: {
							reason: true,
							healthProfile: true,
							oxygen: true,
							symptoms: true,
							temperature: true
						},
						results: {
							reasonForVisit: '',
							symptomTime: '',
							symptomTimeUnit: '',
							isTakingMeds: '',
							hasDrugAllergies: '',
							oxygenSaturation: '',
							temperature: '',
							tempUnit: '',
							otherInfo: '',
							symptoms: [],
							medConditions: []
						},
						hasResult: false,
						id: 'sadas',
						isNewForDoctor: false
					},
					{
						selected: {
							reason: false,
							healthProfile: false,
							oxygen: false,
							symptoms: true,
							temperature: true
						},
						results: {
							reasonForVisit: '',
							symptomTime: '',
							symptomTimeUnit: '',
							isTakingMeds: '',
							hasDrugAllergies: '',
							oxygenSaturation: '',
							temperature: '',
							tempUnit: '',
							otherInfo: '',
							symptoms: [],
							medConditions: []
						},
						hasResult: true,
						id: 'sadasdfg',
						isNewForDoctor: false
					}
				],
				appointmentTimeStart: '2021-02-01T06:30:00.000Z',
				profileHCPid: {
					firstName: 'Peach',
					lastName: 'Pizza'
				},
				accountHCPid: {
					profilePicture:
						'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
				},
				appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
				status: ''
			},
			{
				surveys: [
					{
						selected: {
							reason: false,
							healthProfile: true,
							oxygen: false,
							symptoms: false,
							temperature: false
						},
						results: {
							reasonForVisit: '',
							symptomTime: '',
							symptomTimeUnit: '',
							isTakingMeds: '',
							hasDrugAllergies: '',
							oxygenSaturation: '',
							temperature: '',
							tempUnit: '',
							otherInfo: '',
							symptoms: [],
							medConditions: []
						},
						hasResult: false,
						id: 'sasadas',
						isNewForDoctor: false
					}
				],
				appointmentTimeStart: '2021-02-08T06:30:00.000Z',
				profileHCPid: {
					firstName: 'Pear',
					lastName: 'Fruit'
				},
				accountHCPid: {
					profilePicture:
						'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
				},
				appointmentTimeEnd: '2021-02-08T07:00:00.000Z',
				status: ''
			}
		]
	};
	console.log('data', data);

	return (
		<div>
			<Grid item className={classes.header}>
				<ButtonFilled onClick={() => setDialogSurveyOpen(true)} className={classes.uploadButton}>
					<AddIcon className={classes.uploadIcon} /> New Survey
				</ButtonFilled>
			</Grid>
			{/* {loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />} */}
			{/* IF DATA */}
			{data && (
				<div>
					{data.doctorSurvey.map((apt) => {
						return apt.surveys.map((survey, i) => {
							return (
								<PaperCustomShadow
									style={{ backgroundColor: `${survey.isNewForDoctor && '#D7FEF1'}` }}
									className={classes.paper}
									key={i}
								>
									<Grid container className={classes.wrapper}>
										<Grid item md={3} sm={4} xs={12}>
											<div className={classes.name}>
												<Avatar className={classes.avatar} alt={lastName} src={image} />
												Dr. {lastName}
											</div>
										</Grid>
										<Grid item md={2} sm={4} xs={6}>
											{formatDateShort(apt.appointmentTimeStart)}
										</Grid>
										<Grid item md={2} sm={4} xs={6}>
											{convertTime(apt.appointmentTimeStart)} -{' '}
											{convertTime(apt.appointmentTimeEnd)}
										</Grid>
										<Grid item md={3} sm={6} xs={6}>
											<Typography>
												{survey.selected.reason && 'Reason for visit'}{' '}
												{survey.selected.symptoms && 'Symptoms'}{' '}
												{survey.selected.healthProfile && 'Health Profile'}{' '}
												{survey.selected.oxygen && 'Oxygen'}{' '}
												{survey.selected.temperature && 'Temperature'}
											</Typography>
										</Grid>
										<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
											{survey.hasResult ? (
												<Tooltip title="View result">
													<IconButton
														color="primary"
														onClick={() => {
															setSelectedSurvey(survey);
															setDialogViewResultOpen(true);
														}}
													>
														<VisibilityIcon />
													</IconButton>
												</Tooltip>
											) : (
												<IconButton disabled>
													<VisibilityIcon />
												</IconButton>
											)}
											{survey.hasResult ? (
												<Tooltip title="Result received">
													<CheckCircleOutlineIcon
														color="primary"
														className={classes.checkIcon}
													/>
												</Tooltip>
											) : (
												<Tooltip title="Waiting for patient's result">
													<ErrorOutlineIcon className={classes.errorIcon} />
												</Tooltip>
											)}
											<Tooltip title="Delete request">
												<IconButton
													onClick={() => {
														setSurveyId(survey._id);
														setDeleteId(apt._id);
														setDialogConfirmOpen(true);
													}}
												>
													<DeleteOutlineIcon color="secondary" />
												</IconButton>
											</Tooltip>
										</Grid>
									</Grid>
								</PaperCustomShadow>
							);
						});
					})}
					<DialogViewSurveyResult
						isOpen={dialogViewResultOpen}
						close={() => setDialogViewResultOpen(false)}
						selectedSurvey={selectedSurvey}
					/>
					<DialogConfirm
						action={() => {
							doctorRemoveSurvey({
								variables: {
									idApt: deleteId,
									idSurvey: surveyId
								}
							});
						}}
						isOpen={dialogConfirmOpen}
						close={() => setDialogConfirmOpen(false)}
						actionText="Delete this survey"
						confirmButton="Delete"
					/>
				</div>
			)}

			<DialogNewSurvey
				idHCP={idHCP}
				idPatient={idPatient}
				isOpen={dialogSurveyOpen}
				close={() => setDialogSurveyOpen(false)}
				// refetch={refetch}
			/>
		</div>
	);
};

export default TabPatientSurveys;
