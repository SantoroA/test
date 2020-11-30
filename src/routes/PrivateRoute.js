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
			<Route path="/in/doctor/dashboard" exact component={DoctorDashboardPage} />
			<Route path="/in/doctor/completeprofile" exact component={CompleteProfilePage} />
			<Route path="/in/doctor/coachmark" exact component={DoctorCoachMarkPage} />

			<Route path="/" render={() => <h1>Root</h1>}>
				{isFirstTimeUser ? <Redirect to="/in/doctor/coachmark" /> : <Redirect to="/in/doctor/dashboard" />}
			</Route>
		</Switch>
	);
};

const PrivateRoutePatient = () => {
	const { state: { isFirstTimeUser } } = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/in/reservation/prescreening" exact component={ReservationPrescreening} />
			<Route path="/in/patient/dashboard" exact component={PatientDashboardPage} />
			<Route path="/in/patient/completeprofile" exact component={CompleteProfilePage} />
			<Route path="/in/patient/coachmark" exact component={PatientCoachMarkPage} />
			<Route path="/" render={() => <h1>Root</h1>}>
				{isFirstTimeUser ? (
					<Redirect to="/in/patient/completeprofile" />
				) : (
					<Redirect to="/in/patient/dashboard" />
				)}
			</Route>
			{/* <Route render={() => <h1>ERROR NOT FOUND</h1>} /> */}
		</Switch>
	);
};

export default PrivateRoute;
