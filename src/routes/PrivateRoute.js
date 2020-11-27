import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage';
import PatientDashboardPage from '../pages/patient/PatientDashboardPage';
import PatientCoachMarkPage from '../pages/patient/PatientCoachMarkPage';
import DoctorCoachMarkPage from '../pages/doctor/DoctorCoachMarkPage';
import CompleteProfilePage from '../pages/CompleteProfilePage';
import ReservationPrescreening from '../pages/patient/ReservationPrescreening';

const PrivateRoute = () => {
	const { state: { userAmIHCP } } = useContext(AuthContext);
	return userAmIHCP ? <PrivateRouteDoctor /> : <PrivateRoutePatient />;
};

const PrivateRouteDoctor = () => {
	const { state: { isFirstTimeUser } } = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/" exact render={() => <h1>Root</h1>}>
				{isFirstTimeUser ? <Redirect to="/doctor/coachmark" /> : <Redirect to="/doctor/dashboard" />}
			</Route>
			<Route path="/doctor/dashboard" exact component={DoctorDashboardPage} />
			<Route path="/doctor/completeprofile" exact component={CompleteProfilePage} />
			<Route path="/doctor/coachmark" exact component={DoctorCoachMarkPage} />
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

const PrivateRoutePatient = () => {
	const { state: { isFirstTimeUser } } = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/" exact render={() => <h1>Root</h1>}>
				{isFirstTimeUser ? <Redirect to="/patient/coachmark" /> : <Redirect to="/patient/dashboard" />}
			</Route>
			<Route path="/reservation/prescreening" exact component={ReservationPrescreening} />
			<Route path="/patient/dashboard" exact component={PatientDashboardPage} />
			<Route path="/patient/completeprofile" exact component={CompleteProfilePage} />
			<Route path="/patient/coachmark" exact component={PatientCoachMarkPage} />
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

export default PrivateRoute;
