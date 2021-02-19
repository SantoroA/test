import React, { useState, useContext } from 'react';
import useStyles from './style';
import EmptyLabTestState from './emptyState';
import Row from './row';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../../groups/ErrorMessage';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const LABTEST_QUERY = gql`
	query GetAppointments($idPatient: ID!) {
		patientLabTest(idPatient: $idPatient) {
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
			labTest {
				doctorRequest
				patientResult
			}
		}
	}
`;

const TabLabTests = () => {
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data, fetchMore } = useQuery(LABTEST_QUERY, {
		variables: {
			idPatient: userId
		}
	});

	console.log('data', data);

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const classes = useStyles();
	const { t, i18n } = useTranslation();
	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.header}>
				<Typography className={classes.title} variant="h5">
					{t('LAB_TESTS.1')}
				</Typography>
			</Grid>
			{loading && (
				<Container className={classes.emptyState}>
					<Loader type="TailSpin" color="primary" height={80} width={80} />
				</Container>
			)}
			{error && <ErrorMessage />}
			{/* IF DATA */}
			{/* {data && ( */}
			<div>
				{/* {data.patientLabTest.length > 0 ? ( */}
				<TableContainer className={classes.section} component={PaperCustomShadow}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableHeader}>Doctor Name</TableCell>
								<TableCell className={classes.tableHeader}>Date</TableCell>
								<TableCell className={classes.tableHeader}>Appointment Time</TableCell>

								<TableCell />
							</TableRow>
						</TableHead>
						{/* <TableBody>
									{(rowsPerPage > 0
										? data.patientLabTest.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
										: data.patientLabTest).map((apt) =>
										apt.labTest.map((test, index) => {
										 	return <Row value={test} appointment={apt} key={index} />;
										 })
									)}
								</TableBody> */}
						<TableBody>
							{(rowsPerPage > 0
								? appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: appointments).map((apt) =>
								apt.labTest.doctorRequest.filter((el) => el !== null).map((test, i) => {
									return <Row value={test} appointment={apt} key={i} />;
								})
							)}
						</TableBody>
					</Table>
					{/* <TablePagination
								rowsPerPageOptions={[ 5, 10, 20 ]}
								page={page}
								onChangePage={(e, newPage) => setPage(newPage)}
								rowsPerPage={rowsPerPage}
								component="div"
								count={data.patientLabTest.length}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/> */}
				</TableContainer>
				{/* ) : (
						<EmptyLabTestState />
					)} */}
			</div>
			{/* )} */}
		</Grid>
	);
};

export default TabLabTests;
