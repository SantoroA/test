import React, { useState, useContext } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { useQuery, gql } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
import DialogNewSurvey from '../groups/DialogNewSurvey';
import DialogConfirm from '../groups/DialogConfirm';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import TableHead from '@material-ui/core/TableHead';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import GetAppIcon from '@material-ui/icons/GetApp';

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

const DOCUMENTS_QUERY = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		patientLabTestForDoctors(idHCP: $idHCP, idPatient: $idPatient) {
			accountPatientid {
				profilePicture
			}
			idApt
			profilePatientid {
				_id
				firstName
				lastName
			}
			amount
			reasonForVisit
			patientDoc
			labTest {
				doctorRequest
				status
				patientResult
			}
		}
	}
`;

//MAIN FUNCTION

const TabPatientSurveys = ({ idHCP, idPatient }) => {
	const [ dialogSurveyOpen, setDialogSurveyOpen ] = useState(false);
	const { state: { lastName, image } } = useContext(DocProfileContext);
	const [ dialogConfirmOpen, setDialogConfirmOpen ] = useState(false);
	const [ deleteId, setDeleteId ] = useState('');
	const [ oldFile, setOldFile ] = useState('');
	const classes = useStyles();
	const { loading, error, data, fetchMore } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP,
			idPatient
		}
	});

	console.log('data', data);

	const appointments = [
		{
			surveys: [
				{
					selected: {
						reason: true,
						healthProfile: false,
						oxygen: false,
						symptoms: false,
						temperature: false
					},
					results: {
						reasonForVisit: 'acne',
						symptomTime: 5,
						symptomTimeUnit: 'weeks',
						isTakingMeds: false,
						hasDrugAllergies: true,
						oxygenSaturation: 90,
						temperature: 36,
						tempUnit: 'celsius',
						otherInfo: 'lorem ipsum',
						symptoms: [],
						medConditions: []
					},
					hasResult: true,
					resultLink: 'sda',
					isNewForDoctor: true,
					isNewForPatient: false
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
						reasonForVisit: 'acne',
						symptomTime: 5,
						symptomTimeUnit: 'weeks',
						isTakingMeds: false,
						hasDrugAllergies: true,
						oxygenSaturation: 90,
						temperature: 36,
						tempUnit: 'celsius',
						otherInfo: 'lorem ipsum',
						symptoms: [],
						medConditions: []
					},
					hasResult: true,
					resultLink: 'sdassa',
					isNewForDoctor: false,
					isNewForPatient: false
				}
			],
			appointmentTimeStart: '2021-02-01T06:30:00.000Z',
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
						reasonForVisit: 'acne',
						symptomTime: 5,
						symptomTimeUnit: 'weeks',
						isTakingMeds: false,
						hasDrugAllergies: true,
						oxygenSaturation: 90,
						temperature: 36,
						tempUnit: 'celsius',
						otherInfo: 'lorem ipsum',
						symptoms: [],
						medConditions: []
					},
					hasResult: false,
					resultLink: 'sda',
					isNewForDoctor: false,
					isNewForPatient: true
				},
				{
					selected: {
						reason: false,
						healthProfile: false,
						oxygen: false,
						symptoms: true,
						temperature: false
					},
					results: {
						reasonForVisit: 'acne',
						symptomTime: 5,
						symptomTimeUnit: 'weeks',
						isTakingMeds: false,
						hasDrugAllergies: true,
						oxygenSaturation: 90,
						temperature: 36,
						tempUnit: 'celsius',
						otherInfo: 'lorem ipsum',
						symptoms: [],
						medConditions: []
					},
					hasResult: false,
					resultLink: 'sdassa',
					isNewForDoctor: false,
					isNewForPatient: true
				}
			],
			appointmentTimeStart: '2021-02-08T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-08T07:00:00.000Z',
			status: ''
		}
	];

	return (
		<div>
			<Grid item className={classes.header}>
				<ButtonFilled onClick={() => setDialogSurveyOpen(true)} className={classes.uploadButton}>
					<AddIcon className={classes.uploadIcon} /> New Survey
				</ButtonFilled>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{/* IF DATA */}

			{appointments.map((apt) => {
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
										<Avatar
											className={classes.avatar}
											alt={lastName}
											src={
												image.includes('http') ? (
													image
												) : (
													`http://localhost:10101/dianurse/v1/profile/static/images/${image}`
												)
											}
										/>
										Dr. {lastName}
									</div>
								</Grid>
								<Grid item md={2} sm={4} xs={6}>
									{formatDateShort(apt.appointmentTimeStart)}
								</Grid>
								<Grid item md={2} sm={4} xs={6}>
									{convertTime(apt.appointmentTimeStart)} - {convertTime(apt.appointmentTimeEnd)}
								</Grid>
								<Grid item md={3} sm={6} xs={6}>
									{survey.name}
								</Grid>
								<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
									{survey.hasResult ? (
										<Tooltip title="Download result">
											<IconButton
												href={`http://localhost:10101/dianurse/v1/download/static/docs/private/${survey.resultLink}`}
												target="_blank"
												color="primary"
											>
												<GetAppIcon />
											</IconButton>
										</Tooltip>
									) : (
										<IconButton disabled>
											<GetAppIcon />
										</IconButton>
									)}
									{survey.hasResult ? (
										<Tooltip title="Result received">
											<CheckCircleOutlineIcon color="primary" className={classes.checkIcon} />
										</Tooltip>
									) : (
										<Tooltip title="Waiting for patient's result">
											<ErrorOutlineIcon className={classes.errorIcon} />
										</Tooltip>
									)}
									<Tooltip title="Delete request">
										<IconButton
											onClick={() => {
												setOldFile(survey.requestLink);
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

			<DialogConfirm
				action={() => {}}
				isOpen={dialogConfirmOpen}
				close={() => setDialogConfirmOpen(false)}
				actionText="delete this survey"
				confirmButton="Delete"
			/>
			<DialogNewSurvey
				idHCP={idHCP}
				idPatient={idPatient}
				isOpen={dialogSurveyOpen}
				close={() => setDialogSurveyOpen(false)}
			/>
		</div>
	);
};

export default TabPatientSurveys;
