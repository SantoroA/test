import React from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import PatDashboardTabs from '../../components/layout/PatDashboardTabs';
import PatDashUserInfo from '../../components/layout/PatDashUserInfo';

const PatDashboardScreen = () => {
	return (
		<PatLayoutContainer>
			<PatDashUserInfo />
			<PatDashboardTabs />
		</PatLayoutContainer>
	);
};

export default PatDashboardScreen;
