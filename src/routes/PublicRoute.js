import { Switch, Route, Redirect } from 'react-router-dom';
import GetStartedPage from '../pages/GetStartedPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage';

const PublicRoute = () => {
	return (
		<Switch>
			<Route path="/getstarted" exact component={GetStartedPage} />
			<Route path="/recoverpassword" exact component={ChangePasswordPage} />
			<Route path="/getstarted/:loginCredentials" exact component={GetStartedPage} />
			<Route path="/recoverpassword/:recToken" exact component={ChangePasswordPage} />
			<Route path="/" render={() => <h1>Root</h1>}>
				<Redirect to="/getstarted" />
			</Route>
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

export default PublicRoute;
