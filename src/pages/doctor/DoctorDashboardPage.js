import React from 'react';
import AppBar from '../../components/dashboard/AppBar.js';
import MainInfo from '../../components/dashboard/MainInfo.js';
import TabsPage from '../../components/dashboard/Tabs.js';

const DoctorDashboardPage = () => {
	return (
		<div>
			<AppBar />
			<MainInfo />
			<TabsPage />
		</div>
	);
};

export default DoctorDashboardPage;
