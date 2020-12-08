import React from 'react';
import Navbar from '../../components/layout/Navbar';
import CompleteProfileForm from '../../components/groups/CompleteProfileForm';
import ContactInfoForm from '../../components/groups/ContactInfoForm';

const PatCompleteProfileScreen = () => {
	return (
		<div>
			<Navbar />
			<CompleteProfileForm />
			<ContactInfoForm />
		</div>
	);
};

export default PatCompleteProfileScreen;
