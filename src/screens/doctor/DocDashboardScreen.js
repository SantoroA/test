import React from 'react';
import Navbar from '../../components/Navbar';
import DocDashUserInfo from '../../components/doctor/DocDashUserInfo';
import DocDashboardTabs from '../../components/doctor/DocDashboardTabs';

const DocDashboardScreen = () => {
	return (
		<div>
			<Navbar />
			<DocDashUserInfo />
			<DocDashboardTabs />
		</div>
	);
};

export default DocDashboardScreen;
