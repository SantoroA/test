import React, { useState, useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import useStyles from './style';
import Row from './row';
//CUSTOM UI
import TextInputRounder from '../../customUi/TextInputRounder';
import ButtonIcon from '../../customUi/ButtonIcon';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//CUSTOM ICONS
import EmptyPatientIcon from '../../customIcons/EmptyPatientIcon';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container'; //CUSTOM UI
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

const MYPATIENTS_QUERY = gql`
	query GetPatients($id: ID!, $offset: Int, $limit: Int) {
		doctorsPatients(id: $id, offset: $offset, limit: $limit) {
			accountPatientid {
				profilePicture
			}
			idApt
			start
			end
			profilePatientid {
				_id
				firstName
				lastName
			}
			amount
			reasonForVisit
		}
	}
`;

const EmptyState = () => {
	const classes = useStyles();
	return (
		<PaperCustomShadow className={classes.emptyState}>
			<Typography color="textSecondary" variant="subtitle1">
				Your patients list will appear here
			</Typography>
			<EmptyPatientIcon className={classes.icon} />
			<Typography className={classes.detail} variant="subtitle1">
				No Patients Yes!
			</Typography>
		</PaperCustomShadow>
	);
};

const TabMyPatients = () => {
	const classes = useStyles();
	const [ patientName, setPatientName ] = useState('');
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data } = useQuery(MYPATIENTS_QUERY, {
		variables: { id: userId, offset: 0, limit: 1 }
	});
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	console.log(data);
	console.log(userId);
	const doctorsPatients = [
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/4511649/pexels-photo-4511649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			profilePatientid: {
				lastName: 'White',
				firstName: 'Mrs.',
				_id: '6011887772a95e0028bcbaasdcd8'
			},
			reasonForVisit: 'headache',
			idApt: '6019638853gre9b8800272f3a35',
			end: '2021-02-10T07:30:00.000Z',
			start: '2021-02-10T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/3727219/pexels-photo-3727219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			profilePatientid: {
				lastName: 'Scarlet',
				firstName: 'Miss',
				_id: '6011887772a95e0saa028bcbcd8'
			},
			reasonForVisit: 'covid',
			idApt: '60196388539asdb8800272f3a35',
			end: '2021-02-05T07:30:00.000Z',
			start: '2021-02-05T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/4407897/pexels-photo-4407897.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			profilePatientid: {
				lastName: 'Peacock',
				firstName: 'Mrs.',
				_id: '6011887772ass95e0028bcbcd8'
			},
			reasonForVisit: 'allergies',
			idApt: '60196388gf539b8800272f3a35',
			end: '2021-02-04T07:30:00.000Z',
			start: '2021-02-04T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			profilePatientid: {
				lastName: 'Mustard',
				firstName: 'Col.',
				_id: '6011887772a95e0028abcbcd8'
			},
			reasonForVisit: 'cold',
			idApt: '601963rgw88539b8800272f3a35',
			end: '2021-02-09T07:30:00.000Z',
			start: '2021-02-09T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/1250426/pexels-photo-1250426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			profilePatientid: {
				lastName: 'Green',
				firstName: 'Mr.',
				_id: '6011887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'cardiac palpitations',
			idApt: '60196388539rgbaa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/25758/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			profilePatientid: {
				lastName: 'Plum',
				firstName: 'Prof.',
				_id: '6011as887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'neck pain',
			idApt: '601963gr8s8539baa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/316680/pexels-photo-316680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			profilePatientid: {
				lastName: 'Nintendo',
				firstName: 'Luigi',
				_id: '6011as887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'nausea',
			idApt: '60196ff38s8539baa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.56'
		},
		{
			accountPatientid: {
				profilePicture:
					'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			profilePatientid: {
				lastName: 'Nintendo',
				firstName: 'Bowser',
				_id: '6011as887a772a95e0028abcbcd8'
			},
			reasonForVisit: 'acne',
			idApt: '601963asd8s8539baa8800272f3a35',
			end: '2021-02-01T07:30:00.000Z',
			start: '2021-02-01T07:00:00.000Z',

			amount: '$45.55'
		}
	];
	return (
		<Grid className={classes.root} container>
			<Grid container>
				<Grid item xs={12} sm={6} md={7}>
					<Typography className={classes.title} variant="h5">
						My Patients
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={5}>
					<form>
						<Grid container className={classes.searchContainer}>
							<Grid item xs={9}>
								<TextInputRounder
									type="search"
									fullWidth
									id="search-patient"
									label="Patient Name"
									variant="outlined"
									value={patientName}
									onChange={(e) => setPatientName(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										)
									}}
								/>
							</Grid>
							<Grid item xs={2}>
								<ButtonIcon className={classes.submit} type="submit">
									<SearchIcon />
								</ButtonIcon>
							</Grid>
						</Grid>
					</form>
				</Grid>
				<Grid className={classes.tableContainer} item xs={12}>
					{loading && (
						<Container className={classes.emptyState}>
							<Loader type="TailSpin" color="primary" height={80} width={80} />
						</Container>
					)}
					{error && (
						<Container className={classes.emptyState}>
							<Typography color="textSecondary" variant="h4">
								Something went wrong, please try again later
							</Typography>
						</Container>
					)}
					{/* {doctorsPatients && ( */}
					{data && (
						<div>
							{/* {doctorsPatients.length > 0 ? ( */}
							{data.doctorsPatients.length > 0 ? (
								<TableContainer component={PaperCustomShadow}>
									<Table className={classes.table}>
										<TableHead>
											<TableRow>
												<TableCell className={classes.tableHeader}>Name</TableCell>
												<TableCell className={classes.tableHeader}>Date</TableCell>
												<TableCell className={classes.tableHeader}>Appointment Time</TableCell>
												<TableCell className={classes.tableHeader}>Conditions</TableCell>

												<TableCell />
											</TableRow>
										</TableHead>
										<TableBody>
											{(rowsPerPage > 0
												? data.doctorsPatients.slice(
														page * rowsPerPage,
														page * rowsPerPage + rowsPerPage
													)
												: data.doctorsPatients).map((patient) => {
												return <Row value={patient} key={patient.idApt} buttonText="More" />;
											})}
										</TableBody>
									</Table>
									<TablePagination
										rowsPerPageOptions={[ 5, 10, 20 ]}
										page={page}
										onChangePage={(e, newPage) => setPage(newPage)}
										rowsPerPage={rowsPerPage}
										component="div"
										count={data.doctorsPatients.length}
										// count={doctorsPatients.length}
										onChangeRowsPerPage={handleChangeRowsPerPage}
									/>
								</TableContainer>
							) : (
								<EmptyState />
							)}
						</div>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TabMyPatients;
// message de erro
