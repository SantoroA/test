import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';
import DoctorDashboardScreen from '../screens/doctor/DoctorDashboardScreen';
import PatientDashboardScreen from '../screens/patient/PatientDashboardScreen';
import PatientCoachMarkScreen from '../screens/patient/PatientCoachMarkScreen';
import DoctorCoachMarkScreen from '../screens/doctor/DoctorCoachMarkScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import ReservationPrescreening from '../screens/patient/ReservationPrescreening';

const PrivateRoute = () => {
	const { state: { userAmIHCP } } = useContext(AuthContext);
	return userAmIHCP ? <PrivateRouteDoctor /> : <PrivateRoutePatient />;
};

const PrivateRouteDoctor = () => {
	const { state: { isFirstTimeUser } } = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/in/doctor/dashboard" exact component={DoctorDashboardScreen} />
			<Route path="/in/doctor/completeprofile" exact component={CompleteProfileScreen} />
			<Route path="/in/doctor/coachmark" exact component={DoctorCoachMarkScreen} />

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
			<Route path="/in/patient/dashboard" exact component={PatientDashboardScreen} />
			<Route path="/in/patient/completeprofile" exact component={CompleteProfileScreen} />
			<Route path="/in/patient/coachmark" exact component={PatientCoachMarkScreen} />
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
