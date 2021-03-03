import React, { useContext, useState } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { useQuery, gql, useMutation } from '@apollo/client';
import { APPOINTMENTS_QUERY_PRESCDIALOG } from '../../context/GraphQl/graphQlQuery';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';
import DialogNewPrescription from '../groups/DialogNewPrescription';
import DialogConfirm from '../groups/DialogConfirm';
//CUSTOM UI
import PaperCustomShadow from '../../components/customUi/PaperCustomShadow';
import ButtonFilled from '../../components/customUi/ButtonFilled';
//MATERIAL UI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
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
	}
});

//QUERY ALL PRESCRIPTIONS

const PRESCRIPTION_QUERY = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		doctorPrescription(idHCP: $idHCP, idPatient: $idPatient) {
			accountPatientid {
				profilePicture
			}
			_id
			appointmentTimeEnd
			appointmentTimeStart
			profilePatientid {
				_id
				firstName
				lastName
			}
			amount
			reasonForVisit
			prescription {
				name
				document
			}
		}
	}
`;

//DELETE PRESCRIPTION MUTATION BASED ON ID OF PRESCRIPTION

const REMOVEPRESCRIPTION_MUTATION = gql`
	mutation DeletePresc($idApt: ID!) {
		removePrescription(idApt: $idApt)
	}
`;

//MAIN FUNCTION

const TabPatientDocs = ({ idHCP, idPatient }) => {
	const classes = useStyles();
	const [ dialogPrescOpen, setDialogPrescOpen ] = useState(false);
	const [ dialogConfirmOpen, setDialogConfirmOpen ] = useState(false);
	const [ deleteId, setDeleteId ] = useState('');
	const { state: { lastName, image } } = useContext(DocProfileContext);
	const { loading, error, data, fetchMore } = useQuery(PRESCRIPTION_QUERY, {
		variables: {
			idHCP,
			idPatient
		}
	});
	const [ removePrescription ] = useMutation(REMOVEPRESCRIPTION_MUTATION, {
		refetchQueries: () => [
			{
				query: PRESCRIPTION_QUERY,
				variables: {
					idHCP,
					idPatient
				}
			},
			{
				query: APPOINTMENTS_QUERY_PRESCDIALOG,
				variables: {
					idHCP,
					idPatient
				}
			}
		]
	});

	console.log('data', data);

	const prescriptions = [
		{
			end: '2021-02-01T09:00:00.000Z',
			comments: '',
			name: 'May 2021',
			filename: 'jj'
		}
	];

	return (
		<div>
			<Grid item className={classes.header}>
				<ButtonFilled onClick={() => setDialogPrescOpen(true)} className={classes.uploadButton}>
					<AddIcon /> New Prescription
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
					{data.doctorPrescription.map((presc, i) => {
						return (
							<PaperCustomShadow className={classes.paper} key={i}>
								<Grid container className={classes.wrapper}>
									<Grid item md={3} sm={4} xs={12}>
										<div className={classes.name}>
											<Avatar className={classes.avatar} alt={lastName} src={image} />
											Dr. {lastName}
										</div>
									</Grid>
									<Grid item md={2} sm={4} xs={6}>
										{formatDateShort(presc.appointmentTimeStart)}
									</Grid>
									<Grid item md={2} sm={4} xs={6}>
										{convertTime(presc.appointmentTimeStart)} -{' '}
										{convertTime(presc.appointmentTimeEnd)}
									</Grid>
									<Grid item md={3} sm={6} xs={6}>
										<Tooltip title="Download">
											<Link href={presc.prescription.document} target="_blank" color="primary">
												{presc.prescription.name}
											</Link>
										</Tooltip>
									</Grid>
									<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
										<Tooltip title="View Prescription">
											<IconButton href={presc.prescription.document}>
												<VisibilityIcon color="primary" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete">
											<IconButton
												onClick={() => {
													console.log('click prescription');
													setDialogConfirmOpen(true);
													setDeleteId(presc._id);
												}}
											>
												<DeleteOutlineIcon color="secondary" />
											</IconButton>
										</Tooltip>
									</Grid>
								</Grid>
							</PaperCustomShadow>
						);
					})}
					<DialogConfirm
						action={removePrescription({
							variables: { idApt: deleteId }
						})}
						isOpen={dialogConfirmOpen}
						idApt={deleteId}
						close={() => setDialogConfirmOpen(false)}
						actionText="delete this prescription"
						confirmButton="Delete"
					/>
				</div>
			)}
			<DialogNewPrescription
				idHCP={idHCP}
				idPatient={idPatient}
				isOpen={dialogPrescOpen}
				close={() => setDialogPrescOpen(false)}
			/>
		</div>
	);
};

export default TabPatientDocs;
