import React from 'react';
import Navbar from '../components/Navbar';
import GetStartedPatient from '../components/GetStartedPatient';
import GetStartedDoctor from '../components/GetStartedDoctor';

const queryString = require('query-string');

const GetStartedPage = ({ location }) => {
	const isPatient = queryString.parse(location.search);
	console.log(isPatient);

	return (
		<div>
			<Navbar />
			{isPatient === '0' ? <GetStartedPatient /> : <GetStartedDoctor />}
		</div>
	);
};

export default GetStartedPage;
