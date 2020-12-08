import React from 'react';
import Navbar from '../../components/Navbar';
import CompleteProfileForm from '../../components/forms/CompleteProfileForm';
import ContactInfoForm from '../../components/forms/ContactInfoForm';

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
