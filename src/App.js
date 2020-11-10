import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import DoctorRegisterPage from './pages/DoctorRegisterPage';
import PatientRegisterPage from './pages/PatientRegisterPage';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider, Context as LanguageContext } from './context/LanguageContext';
import './App.css';

const App = () => {
	const { state: { token } } = useContext(AuthContext);
	if (token) {
		return <div>Your token is ok</div>;
	} else {
		return (
			<Switch>
				<Route path="/" exact component={PatientRegisterPage} />
				<Route path="/doctorregister" exact component={DoctorRegisterPage} />
			</Switch>
		);
	}
};

export default () => {
	return (
		<AuthProvider>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</AuthProvider>
	);
};
