import React, { useState, useContext } from 'react';
import useStyles from './style';
import EmptyLabTestState from './emptyState';
import Row from './row';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from '../../../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../../groups/ErrorMessage';
//MATERIAL UI
import Container from '@material-ui/core/Container';
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

// !!!! EACH REQUEST HAS TO HAVE 'HAS BEEN DOWNLOADED' (TO SHOW IF IT IS NEW) AND 'HAS RESULT UPLOADED'

const TabLabTests = () => {
	const { state: { userId } } = useContext(AuthContext);
	const { loading, error, data, fetchMore } = useQuery(LABTEST_QUERY, {
		variables: {
			idPatient: userId
		}
	});

	console.log('data', data);
	const classes = useStyles();

	const appointments = [
		{
			profileHCPid: {
				firstName: 'Lemon',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-10T09:30:00.000Z',
			appointmentTimeEnd: '2021-02-10T09:30:00.000Z',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/3053844/pexels-photo-3053844.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			labTest: {
				doctorRequest: [
					{
						name: 'Request 1',
						isNew: true,
						hasResult: false,
						result: 'filename'
					},
					{
						name: 'Request 2',
						isNew: false,
						hasResult: true,
						result: 'filename'
					},
					{
						name: 'Request 3',
						isNew: false,
						hasResult: true,
						result: 'filename'
					}
				]
			},
			_id: 'sfwefwefadaawef'
		},
		{
			profileHCPid: {
				firstName: 'Apple',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-10T08:30:00.000Z',
			appointmentTimeEnd: '2021-02-10T08:30:00.000Z',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/3136340/pexels-photo-3136340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			},
			labTest: {
				doctorRequest: [
					{
						name: 'Request 1',
						isNew: true,
						hasResult: false,
						result: 'filename'
					}
				]
			},

			_id: 'sfwefasdaswefawef'
		},
		{
			profileHCPid: {
				firstName: 'Peach',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-10T07:00:00.000Z',
			appointmentTimeEnd: '2021-02-10T07:30:00.000Z',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			labTest: {
				doctorRequest: [
					{
						name: 'Request 1',
						isNew: false,
						hasResult: false,
						result: 'filename'
					}
				]
			},
			_id: '60196388539b8800272f3a36'
		},
		{
			profileHCPid: {
				firstName: 'Pear',
				lastName: 'Fruit'
			},
			appointmentTimeStart: '2021-02-05T07:00:00.000Z',
			appointmentTimeEnd: '2021-02-05T07:30:00.000Z',
			accountHCPid: {
				profilePicture:
					'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
			},
			labTest: {
				doctorRequest: [
					{
						name: 'Request 1',
						isNew: true,
						hasResult: false,
						result: 'filename'
					},
					{
						name: 'Request 2',
						isNew: false,
						hasResult: false,
						result: 'filename'
					},
					{
						name: 'Request 3',
						isNew: false,
						hasResult: true,
						result: 'filename'
					}
				]
			},

			_id: 'sfwefwfvfdefawef'
		}
	];

	const { t } = useTranslation();
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
				{appointments.map((apt) =>
					apt.labTest.doctorRequest.filter((el) => el !== null).map((request, i) => {
						return <Row value={request} appointment={apt} key={i} />;
					})
				)}

				{/* ) : ( */}
				<EmptyLabTestState />
				{/* )}  */}
			</div>
			{/* )} */}
		</Grid>
	);
};

export default TabLabTests;
