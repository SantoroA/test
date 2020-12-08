import React from 'react';
import Navbar from '../../components/layout/Navbar';
import DocDashUserInfo from '../../components/layout/DocDashUserInfo';
import DocDashboardTabs from '../../components/layout/DocDashboardTabs';

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
