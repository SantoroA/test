import React from 'react';
import Navbar from '../../components/Navbar';
import MainInfo from '../../components/dashboard/MainInfo';
import DashboardTabs from '../../components/dashboard/DashboardTabs';

const DocDashboardScreen = () => {
	return (
		<div>
			<Navbar />
			<MainInfo />
			<DashboardTabs />
		</div>
	);
};

export default DocDashboardScreen;
