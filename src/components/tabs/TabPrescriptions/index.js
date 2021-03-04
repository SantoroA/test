import React, { useState, useContext } from 'react';
import useStyles from './style';
import EmptyPrescState from './emptyState';
import Row from './row';
import Loader from 'react-loader-spinner';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../groups/ErrorMessage';
import { Context as AuthContext } from '../../../context/AuthContext';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//CUSTOM UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const PRESCRIPTION_QUERY = gql`
query GetPrescription($idPatient: ID!, $cursor: String, $limit: Int) {
    patientPrescription(idPatient: $idPatient, cursor: $cursor, limit: $limit) {
        edges {
            profileHCPid {
            _id
            firstName
            lastName
        }
        _id
        appointmentTimeStart
        appointmentTimeEnd
        profilePatientid
        accountHCPid {
            profilePicture
        }
        amount
        prescription {
            name
			document
			isNew
        }
        }
        pageInfo {
              endCursor,
              hasNextPage,
            },
        totalCount
        
    }
}
`;

const prescriptions = [
	{
		docName: 'Gabi',
		start: '2021-02-10T09:30:00.000Z',
		end: '2021-02-10T09:30:00.000Z',
		prescName: 'Prescription for Liver Disease',
		docPic:
			'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefwefadaawef',
		isNew: true
	},
	{
		docName: 'Aline',
		start: '2021-02-10T08:30:00.000Z',
		end: '2021-02-10T08:30:00.000Z',
		prescName: 'Acne medication',
		docPic:
			'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		id: 'sfwefasdaswefawef',
		isNew: false
	},
	{
		docName: 'Peach',
		start: '2021-02-10T07:00:00.000Z',
		end: '2021-02-10T07:30:00.000Z',
		prescName: 'Muscle relaxer',
		docPic:
			'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefweaadfeffawef',
		isNew: false
	},
	{
		docName: 'Pear',
		start: '2021-02-05T07:00:00.000Z',
		end: '2021-02-05T07:30:00.000Z',
		prescName: 'Lamitrigine',
		docPic:
			'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		id: 'sfwefwfvfdefawef',
		isNew: false
	}
];

const TabPrescriptions = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const { state: { userId } } = useContext(AuthContext);
	const { error, loading, data, fetchMore } = useQuery(PRESCRIPTION_QUERY, {
		variables: {
			idPatient: userId,
			cursor: null,
			limit: 2
		}
	});

	console.log(data)

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();
	const { t } = useTranslation();
	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					{t('PRESCRIPTIONS.1')}
				</Typography>
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
				{data.patientPrescription.edges.length > 0 ? ( 
					data.patientPrescription.edges.map((presc) => {
						return <Row value={presc} key={presc._id} />;
					})
				): (
			<EmptyPrescState />
				)}
				{data.patientPrescription.pageInfo.hasNextPage && (
							<ButtonNoBorder
								className={classes.buttonLoadMore}
								onClick={() => {
									const { endCursor } = data.patientPrescription.pageInfo;
									fetchMore({
										variables: {
											id: userId,
											limit: 2,
											cursor: endCursor
										},
										updateQuery: (prevResult, { fetchMoreResult }) => {
											console.log('prev', prevResult);
											console.log('fetch', fetchMoreResult);
											fetchMoreResult.patientPrescription.edges = [
												...prevResult.patientPrescription.edges,
												...fetchMoreResult.patientPrescription.edges
											];
											return fetchMoreResult;
										}
									});
								}}
							>
								Load More <ExpandMoreIcon />
							</ButtonNoBorder>
						)}
			</div>	
			 )} 		
		</Grid>
	);
};

export default TabPrescriptions;
