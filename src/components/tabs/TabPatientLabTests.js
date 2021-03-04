import React, { useContext, useState } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { useQuery, gql, useMutation } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
import DialogNewLabTest from '../groups/DialogNewLabTest';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { APPOINTMENTS_QUERY_TESTDIALOG } from '../../context/GraphQl/graphQlQuery';
import DialogConfirm from '../groups/DialogConfirm';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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

const LABTEST_QUERY = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		patientLabTestForDoctors(idHCP: $idHCP, idPatient: $idPatient) {
			accountPatientid {
				profilePicture
			}
			_id
			profilePatientid {
				_id
				firstName
				lastName
			}
			amount
			appointmentTimeStart
			appointmentTimeEnd
			labTestRequests {
				name
				requestLink
				isNewForPatient
				hasResult
				isNewForDoctor
				resultLink
			}
		}
	}
`;

const DELETEDOC_MUTATION = gql`
	mutation DeleteLabTest($idApt: ID!, $oldFile: String!) {
		doctorRemoveLabTest(idApt: $idApt, oldFile: $oldFile)
	}
`;

const VIEW_MUTATION = gql`
	mutation UpdateDocView($idApt: ID!, $file: String!) {
		doctorViewLabTest(idApt: $idApt, file: $file)
	}
`;

//MAIN FUNCTION

const TabPatientLabTests = ({ idHCP, idPatient }) => {
	const classes = useStyles();
	const [ oldFile, setOldFile ] = useState('');
	const [ idApt, setidApt ] = useState('');
	const [ dialogTestOpen, setDialogTestOpen ] = useState(false);
	const [ dialogConfirmOpen, setDialogConfirmOpen ] = useState(false);
	const { state: { lastName, image } } = useContext(DocProfileContext);
	const { error, data, fetchMore } = useQuery(LABTEST_QUERY, {
		variables: {
			idHCP,
			idPatient
		}
	});

	const [ doctorViewLabTest ] = useMutation(VIEW_MUTATION, {
		refetchQueries: () => [
			{
				query: LABTEST_QUERY,
				variables: {
					idHCP,
					idPatient
				}
			}
		]
	});

	const [ doctorRemoveLabTest, { loading } ] = useMutation(DELETEDOC_MUTATION, {
		refetchQueries: () => [
			{
				query: LABTEST_QUERY,
				variables: {
					idHCP,
					idPatient
				}
			},
			{
				query: APPOINTMENTS_QUERY_TESTDIALOG,
				variables: {
					idHCP,
					idPatient
				}
			}
		]
	});

	console.log('dataDoctorLab', data);

	const appointments = [
		{
			labTest: {
				doctorRequest: [
					{
						name: 'X-Ray',
						requestLink: 'filename',
						hasResult: true,
						isNewForDoctor: true,
						resultLink: 'filename'
					}
				]
			},
			appointmentTimeStart: '2021-02-01T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
			status: ''
		},
		{
			labTest: {
				doctorRequest: [
					{
						name: 'Blood Test - 1',
						requestLink: 'filename',
						hasResult: false,
						isNewForDoctor: false,
						resultLink: 'filename'
					}
				]
			},
			appointmentTimeStart: '2021-02-01T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
			status: ''
		},
		{
			labTest: {
				doctorRequest: [
					{
						name: 'Blood Test - 2',
						requestLink: 'filename',
						hasResult: true,
						isNewForDoctor: false,
						resultLink: 'filename'
					}
				]
			},
			appointmentTimeStart: '2021-02-01T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
			status: ''
		}
	];

	return (
		<div>
			<Grid item className={classes.header}>
				<ButtonFilled onClick={() => setDialogTestOpen(true)} className={classes.uploadButton}>
					<AddIcon className={classes.uploadIcon} /> New Lab Test
				</ButtonFilled>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{/* IF DATA */}
			{data && (
				<div>
					{data.patientLabTestForDoctors.map((apt) => {
						{
							/* {appointments.map((apt) => { */
						}
						console.log(apt.labTestRequests);
						return apt.labTestRequests.map((lab, i) => {
							console.log(lab, i);
							return (
								<PaperCustomShadow
									className={classes.paper}
									style={{ backgroundColor: `${lab.isNewForDoctor && '#D7FEF1'}` }}
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
											<Tooltip title="Download Request">
												<Link href={lab.requestLink} target="_blank" color="primary">
													{lab.name}
												</Link>
											</Tooltip>
										</Grid>
										<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
											{lab.hasResult ? (
												<Tooltip title="Download result">
													<IconButton
														href={lab.resultLink}
														target="_blank"
														color="primary"
														onClick={() => {
															doctorViewLabTest({
																variables: {
																	idApt: apt._id,
																	file: lab.resultLink
																}
															});
														}}
													>
														<GetAppIcon />
													</IconButton>
												</Tooltip>
											) : (
												<IconButton disabled>
													<GetAppIcon />
												</IconButton>
											)}
											{lab.hasResult ? (
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
														setOldFile(lab.requestLink);
														setidApt(apt._id);
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
						action={() => {doctorRemoveLabTest({
							variables: {
								idApt,
								oldFile
							}
						})}}
						idApt={idApt}
						oldFile={oldFile}
						isOpen={dialogConfirmOpen}
						close={() => {
							setDialogConfirmOpen(false);
							setOldFile('');
						}}
						actionText="delete this lab test request"
						confirmButton="Delete"
					/>
				</div>
			)}
			<DialogNewLabTest
				idHCP={idHCP}
				idPatient={idPatient}
				isOpen={dialogTestOpen}
				close={() => setDialogTestOpen(false)}
			/>
		</div>
	);
};

export default TabPatientLabTests;
