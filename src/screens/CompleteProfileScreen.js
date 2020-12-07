import React, { useContext } from 'react';
// import { Context as AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CompleteProfileForm from '../components/forms/CompleteProfileForm';
import ContactInfoForm from '../components/forms/ContactInfoForm';

const CompleteProfileScreen = () => {
	// const { userAmIHCP } = useContext(AuthContext);
	return (
		<div>
			<Navbar />
			<CompleteProfileForm />
			<ContactInfoForm />
		</div>
	);
};

export default CompleteProfileScreen;
