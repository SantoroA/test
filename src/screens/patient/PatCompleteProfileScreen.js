import React from 'react';
import PatLayoutContainer from '../../components/layout/PatLayoutContainer';

import FormCompleteProfile from '../../components/groups/FormCompleteProfile';
import ContactInfoForm from '../../components/groups/ContactInfoForm';

const PatCompleteProfileScreen = () => {
	return (
		<PatLayoutContainer>
			<FormCompleteProfile />
			<ContactInfoForm />
		</PatLayoutContainer>
	);
};

export default PatCompleteProfileScreen;
