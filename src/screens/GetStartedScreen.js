import React from 'react';
import Navbar from '../components/Navbar';
import GetStarted from '../components/GetStarted';

const GetStartedScreen = (props) => {
	const { loginCredentials } = props.match.params;

	return (
		<div>
			<Navbar />
			<GetStarted loginCredentials={loginCredentials} />
		</div>
	);
};

export default GetStartedScreen;
