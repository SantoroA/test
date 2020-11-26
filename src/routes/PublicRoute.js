import { Switch, Route, Redirect } from 'react-router-dom';
import GetStartedPage from '../pages/GetStartedPage';
import RecoverPasswordPage from '../pages/RecoverPasswordPage';
import DoctorDashboardPage from '../pages/doctor/DoctorDashboardPage';

const PublicRoute = () => {
	return (
		<Switch>
			<Route path="/getstarted" exact component={GetStartedPage} />
			<Route path="/doctor/dashboard" exact component={DoctorDashboardPage} />
			<Route path="/recoverpassword" exact component={RecoverPasswordPage} />
			<Route path="/" exact render={() => <h1>Root</h1>}>
				<Redirect to="/getstarted/json" />
			</Route>
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

export default PublicRoute;
