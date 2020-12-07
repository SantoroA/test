import { Switch, Route, Redirect } from 'react-router-dom';
import GetStartedScreen from '../screens/GetStartedScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const PublicRoute = () => {
	return (
		<Switch>
			<Route path="/getstarted" exact component={GetStartedScreen} />
			<Route path="/recoverpassword" exact component={ChangePasswordScreen} />
			<Route path="/getstarted/:loginCredentials" exact component={GetStartedScreen} />
			<Route path="/recoverpassword/:recToken" exact component={ChangePasswordScreen} />
			<Route path="/" render={() => <h1>Root</h1>}>
				<Redirect to="/getstarted" />
			</Route>
			<Route render={() => <h1>ERROR NOT FOUND</h1>} />
		</Switch>
	);
};

export default PublicRoute;
