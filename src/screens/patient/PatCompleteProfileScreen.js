import React from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import FormEmailAndPassword from '../../components/groups/FormEmailAndPassword';
import FormContactInfo from '../../components/groups/FormContactInfo';

const PatCompleteProfileScreen = () => {
	return (
		<PatLayoutContainer>
			<FormEmailAndPassword />
			<FormContactInfo />
		</PatLayoutContainer>
	);
};

export default PatCompleteProfileScreen;
