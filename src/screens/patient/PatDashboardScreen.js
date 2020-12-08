import React from 'react';
import Navbar from '../../components/layout/Navbar';
import PatDashboardTabs from '../../components/layout/PatDashboardTabs';
import PatDashUserInfo from '../../components/layout/PatDashUserInfo';

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
