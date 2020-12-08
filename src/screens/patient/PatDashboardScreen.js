import React from 'react';
import Navbar from '../../components/Navbar';
import Typography from '@material-ui/core/Typography';
import PatDashboardTabs from '../../components/patient/PatDashboardTabs';
import PatDashUserInfo from '../../components/patient/PatDashUserInfo';

const PatDashboardScreen = () => {
	return (
		<div>
			<Navbar />

			<PatDashUserInfo />
			<PatDashboardTabs />
		</div>
	);
};

export default PatDashboardScreen;
