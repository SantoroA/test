import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as PatProfileContext } from '../context/PatProfileContext';
import { Context as DocProfileContext } from '../context/DocProfileContext';
import LoadingScreen from '../screens/public/LoadingScreen';
//doctor screens
import DocDashboardScreen from '../screens/doctor/DocDashboardScreen';
import DocCoachMarkScreen from '../screens/doctor/DocCoachMarkScreen';
import DocCompleteProfileScreen from '../screens/doctor/DocCompleteProfileScreen';
import DocHelpScreen from '../screens/doctor/DocHelpScreen';
import DocMembershipScreen from '../screens/doctor/DocMembershipScreen';
import DocMyPatientsScreen from '../screens/doctor/DocMyPatientsScreen';
import DocPastAppointmentsScreen from '../screens/doctor/DocPastAppointmentsScreen';
import DocVideoCallScreen from '../screens/doctor/DocVideoCallScreen';
import DocVideoPrecallScreen from '../screens/doctor/DocVideoPrecallScreen';
import DocViewPublicProfileScreen from '../screens/doctor/DocViewPublicProfileScreen';
//patient screens
import PatAssistantScreen from '../screens/patient/PatAssistantScreen';
import PatCoachMarkScreen from '../screens/patient/PatCoachMarkScreen';
import PatCompleteProfileScreen from '../screens/patient/PatCompleteProfileScreen';
import PatDashboardScreen from '../screens/patient/PatDashboardScreen';
import PatDoctorSearchDetailScreen from '../screens/patient/PatDoctorSearchDetailScreen';
import PatDoctorSearchScreen from '../screens/patient/PatDoctorSearchScreen';
import PatReserveScreen from '../screens/patient/PatReserveScreen';
import PatHelpScreen from '../screens/patient/PatHelpScreen';
import PatMembershipScreen from '../screens/patient/PatMembershipScreen';
import PatPastAppointmentsScreen from '../screens/patient/PatPastAppointmentsScreen';
import PatVideoCallScreen from '../screens/patient/PatVideoCallScreen';
import PatVideoPrecallScreen from '../screens/patient/PatVideoPrecallScreen';

const PrivateRoute = () => {
	const { state: { userAmIHCP } } = useContext(AuthContext);
	return userAmIHCP ? <PrivateRouteDoctor /> : <PrivateRoutePatient />;
};

const PrivateRouteDoctor = () => {
	const { state: { isFirstTimeUser } } = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/in/doctor/coachmark" exact component={DocCoachMarkScreen} />
			<Route path="/in/doctor/help" exact component={DocHelpScreen} />
			<Route path="/in/doctor/membership" exact component={DocMembershipScreen} />
			<Route path="/in/doctor/mypatients" exact component={DocMyPatientsScreen} />
			<Route path="/in/doctor/pastappointments" exact component={DocPastAppointmentsScreen} />
			<Route path="/in/doctor/videocall" exact component={DocVideoCallScreen} />
			<Route path="/in/doctor/videoprecall" exact component={DocVideoPrecallScreen} />
			<Route path="/in/doctor/viewprofile" exact component={DocViewPublicProfileScreen} />
			<Route path="/in/doctor/completeprofile" component={DocCompleteProfileScreen} />
			<Route path="/in/doctor/dashboard" component={DocDashboardScreen} />
			<Route path="/" component={LoadingScreen}>
				{isFirstTimeUser ? <Redirect to="/in/doctor/coachmark" /> : <Redirect to="/in/doctor/dashboard" />}
			</Route>
		</Switch>
	);
};

const PrivateRoutePatient = () => {
	const { state: { isFirstTimeUser } } = useContext(AuthContext);
	return (
		<Switch>
			<Route path="/in/patient/coachmark" exact component={PatCoachMarkScreen} />
			<Route path="/in/patient/assistant" exact component={PatAssistantScreen} />
			<Route path="/in/patient/doctorsearchdetail" exact component={PatDoctorSearchDetailScreen} />
			<Route path="/in/patient/doctorsearch" exact component={PatDoctorSearchScreen} />
			<Route path="/in/patient/reserve" exact component={PatReserveScreen} />
			<Route path="/in/patient/help" exact component={PatHelpScreen} />
			<Route path="/in/patient/membership" exact component={PatMembershipScreen} />
			<Route path="/in/patient/pastappointments" exact component={PatPastAppointmentsScreen} />
			<Route path="/in/patient/videocall" exact component={PatVideoCallScreen} />
			<Route path="/in/patient/videoprecall" exact component={PatVideoPrecallScreen} />
			<Route path="/in/patient/completeprofile" component={PatCompleteProfileScreen} />
			<Route path="/in/patient/dashboard" component={PatDashboardScreen} />
			<Route path="/" component={LoadingScreen}>
				{isFirstTimeUser ? <Redirect to="/in/patient/coachmark" /> : <Redirect to="/in/patient/dashboard" />}
			</Route>
			{/* <Route render={() => <h1>ERROR NOT FOUND</h1>} /> */}
		</Switch>
	);
};

export default PrivateRoute;
