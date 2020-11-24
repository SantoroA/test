import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import GetStartedPage from './pages/GetStartedPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ReservationPrescreening from './pages/ReservationPrescreening';

import './App.css';

const Routes = () => {
	const { state: { isLoggedIn } } = useContext(AuthContext);

	return <Router>{isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>;
};

const PublicRoute = () => {
	return (
		<Switch>
			<Route path="/getstarted/json" exact component={GetStartedPage} />
			<Route path="/dashboard" exact component={DashboardPage} />
			<Route path="/recoverpassword" exact component={RecoverPasswordPage} />
			<Route path="/" exact render={() => <h1>Root</h1>}>
				<Redirect to="/getstarted/json" />
			</Route>
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

const PrivateRoute = () => {
	const { state: { userAmIHCP } } = useContext(AuthContext);
	return userAmIHCP ? <PrivateRouteDoctor /> : <PrivateRoutePatient />;
};

const PrivateRouteDoctor = () => {
	return (
		<Switch>
			<Route path="/" exact render={() => <h1>Root</h1>}>
				<Redirect to="/doctordashboard" />
			</Route>
			<Route path="/doctordashboard" exact component={DashboardPage} />
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

const PrivateRoutePatient = () => {
	return (
		<Switch>
			<Route path="/" exact render={() => <h1>Root</h1>}>
				<Redirect to="/patientdashboard" />
			</Route>
			<Route path="/reservation/prescreening" exact component={ReservationPrescreening} />
			<Route path="/patientdashboard" exact component={DashboardPage} />
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<LanguageProvider>
				<Routes />
			</LanguageProvider>
		</AuthProvider>
	);
};

export default App;
