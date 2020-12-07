import React from 'react';
import Navbar from '../../components/Navbar';
import MainInfo from '../../components/dashboard/MainInfo';
import TabsPage from '../../components/dashboard/Tabs';

const DocDashboardScreen = () => {
	return (
		<div>
			<Navbar />
			<MainInfo />
			<TabsPage />
		</div>
	);
};

export default DocDashboardScreen;
