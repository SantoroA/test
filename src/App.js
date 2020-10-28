import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import DoctorSignupPage from './pages/DoctorSignupPage';
import PatientSignupPage from './pages/PatientSignupPage';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import './App.css';

const App = () => {
	return (
		<AuthProvider>
			<Switch>
				<Route path="/" exact component={PatientSignupPage} />
				<Route path="/doctorsignup" exact component={DoctorSignupPage} />
			</Switch>
		</AuthProvider>
	);
};

export default App;
