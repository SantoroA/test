import React, { useContext } from 'react';
// import { Context as AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CompleteProfileForm from '../components/CompleteProfileForm';
import ContactInfoForm from '../components/ContactInfoForm';

const CompleteProfilePage = () => {
	// const { userAmIHCP } = useContext(AuthContext);
	return (
		<div>
			<Navbar />
			<CompleteProfileForm />
			<ContactInfoForm />
		</div>
	);
};

export default CompleteProfilePage;
