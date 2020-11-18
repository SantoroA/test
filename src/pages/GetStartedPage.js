import React from 'react';
import Navbar from '../components/Navbar';
import GetStartedPatient from '../components/GetStartedPatient';
import GetStartedDoctor from '../components/GetStartedDoctor';

const queryString = require('query-string');

const GetStartedPage = ({ location }) => {
	const { patient } = queryString.parse(location.search);
	console.log(patient);

	return (
		<div>
			<Navbar />
			{patient === '0' ? <GetStartedPatient /> : <GetStartedDoctor />}
		</div>
	);
};

export default GetStartedPage;
