import React from 'react';
import Navbar from '../components/Navbar';
import GetStarted from '../components/GetStarted';

const GetStartedPage = (props) => {
	const { loginCredentials } = props.match.params;
	console.log(loginCredentials);
	return (
		<div>
			<Navbar />
			<GetStarted loginCredentials={loginCredentials} />
		</div>
	);
};

export default GetStartedPage;
