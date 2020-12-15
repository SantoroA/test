import React from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import CompleteProfileForm from '../../components/groups/CompleteProfileForm';
import ContactInfoForm from '../../components/groups/ContactInfoForm';

const PatCompleteProfileScreen = () => {
	return (
		<PatLayoutContainer>
			<CompleteProfileForm />
			<ContactInfoForm />
		</PatLayoutContainer>
	);
};

export default PatCompleteProfileScreen;
