import React from 'react';
import Navbar from '../../components/layout/Navbar';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';

const PatDoctorSearchScreen = () => {
	return (
		<div>
			<Navbar />
			<Typography variant="h4">Search for Doctor</Typography>
		</div>
	);
};

export default PatDoctorSearchScreen;
