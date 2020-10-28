import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoctorSignupPage from './pages/DoctorSignupPage';
import PatientSignupPage from './pages/PatientSignupPage';
import './App.css';

const App = () => {
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact component={PatientSignupPage} />
				<Route path="/doctorsignup" exact component={DoctorSignupPage} />
			</Switch>
		</div>
	);
};

export default App;
