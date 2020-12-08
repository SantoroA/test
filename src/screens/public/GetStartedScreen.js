import React from 'react';
import Navbar from '../../components/layout/Navbar';
import GetStarted from '../../components/layout/GetStarted';

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
