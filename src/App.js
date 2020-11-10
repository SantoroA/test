import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import DoctorRegisterPage from './pages/DoctorRegisterPage';
import PatientRegisterPage from './pages/PatientRegisterPage';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import './App.css';

const App = () => {
	return (
		<AuthProvider>
			<Switch>
				<Route path="/" exact component={PatientRegisterPage} />
				<Route path="/doctorregister" exact component={DoctorRegisterPage} />
			</Switch>
		</AuthProvider>
	);
};

export default App;
