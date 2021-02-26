import React, { useContext } from 'react';
import { convertTime, formatDateShort } from '../../helpers/dateHelper';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
import { useQuery, gql, useMutation } from '@apollo/client';
import ErrorMessage from '../groups/ErrorMessage';
import Loader from 'react-loader-spinner';

//CUSTOM UI
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	name: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		marginRight: '1rem'
	},
	emptyState: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '20rem',
		flexDirection: 'column',
		textAlign: 'center'
	},
	iconsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '1rem'
	},
	paper: {
		marginBottom: '0.5rem'
	}
});

const DOCUMENTS_QUERY = gql`
	query GetAppointments($idHCP: ID!, $idPatient: ID!) {
		patientDocsForDoctors(idHCP: $idHCP, idPatient: $idPatient) {
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
			patientDoc {
				isNew
				name
				document
			}
			labTest {
				doctorRequest
				patientResult
			}
		}
	}
`;

const VIEW_MUTATION = gql`
mutation UpdateDocView($idApt: ID!) {
	doctorViewDoc(idApt: $idApt) 
}
`;

//MAIN FUNCTION

const TabPatientDocs = ({ idHCP, idPatient }) => {
	const classes = useStyles();
	const { state: { lastName, image } } = useContext(DocProfileContext);

	const { error, loading, data, fetchMore, refetch } = useQuery(DOCUMENTS_QUERY, {
		variables: {
			idHCP,
			idPatient
		}
	});
	const [doctorViewDoc] = useMutation(VIEW_MUTATION, {
		refetchQueries: () => [				{
			  query: DOCUMENTS_QUERY,
			  variables: {
				idHCP,
				idPatient
			  }}
		  ]
	});

	console.log(data)

	const documents = [
		{
			appointmentTimeStart: '2021-02-01T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-01T07:00:00.000Z',
			patientDoc: {
				name: 'Bacon',
				status: 'seen',
				isNew: true
			}
		},
		{
			appointmentTimeStart: '2021-02-05T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-05T07:00:00.000Z',
			patientDoc: {
				name: 'See this',
				status: 'seen',
				isNew: false
			}
		},
		{
			appointmentTimeStart: '2021-02-09T06:30:00.000Z',
			appointmentTimeEnd: '2021-02-09T07:00:00.000Z',
			patientDoc: {
				name: 'Wink wink',
				status: 'seen',
				isNew: false
			}
		}
	];

	return (
		<div>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{/* IF DATA */}
			{data && ( 
			<div>
				{data.patientDocsForDoctors.map((doc, i) => { 
				// documents.map((doc, i) => {
					// CSS color not updating
					return (
						<PaperCustomShadow
							className={classes.paper}
							style={{ backgroundColor: `${doc.patientDoc.isNew && '#D7FEF1'}` }}
							key={i}
						>
							<Grid container className={classes.wrapper}>
								<Grid item md={3} sm={4} xs={12}>
									<div className={classes.name}>
										<Avatar
											className={classes.avatar}
											alt={lastName}
											src={ image }
										/>
										Dr. {lastName}
									</div>
								</Grid>
								<Grid item md={2} sm={4} xs={6}>
									{formatDateShort(doc.appointmentTimeEnd)}
								</Grid>
								<Grid item md={2} sm={4} xs={6}>
									{convertTime(doc.appointmentTimeStart)} - {convertTime(doc.appointmentTimeEnd)}
								</Grid>
								<Grid item md={3} sm={6} xs={6}>
									{doc.patientDoc.name}
								</Grid>
								<Grid item md={2} sm={6} xs={6} className={classes.iconsWrapper}>
									<Tooltip title="Download">
										<IconButton
											href={doc.patientDoc.document}
											onClick={() => {
												console.log(doc._id)
												try {
													doctorViewDoc({variables: {idApt: doc._id}})
												} catch(err) {
													console.log(err)
												}
												
											}}
											target="_blank"
											color="primary"
										>
											<GetAppIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Preview">
										<IconButton
											href={doc.patientDoc.document}
											target="_blank"
											color="primary"
										>
											<VisibilityIcon />
										</IconButton>
									</Tooltip>
								</Grid>
							</Grid>
						</PaperCustomShadow>
					);
					// })
				})}
			</div>
			)} 
		</div>
	);
};

export default TabPatientDocs;
