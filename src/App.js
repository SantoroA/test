import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import GetStartedPage from './pages/GetStartedPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';

const Routes = () => {
	const { state: { isLoggedIn } } = useContext(AuthContext);

	return (
		<Router>
			{/* {isLoggedIn ? (
				<Switch>
					<Route path="/" exact render={() => <h1>Root</h1>}>
						<Redirect to="/dashboard" />
					</Route>
					<Route path="/dashboard" exact component={DashboardPage} />
				</Switch>
			) : ( */}
			<Switch>
				<Route path="/getstarted/json" exact component={GetStartedPage} />
				{/* //TODO: REMOVE DASHBOARD ROUTE AND UNCOMMENT ISLOGGEDIN WHEN DEPLOY */}
				<Route path="/dashboard" exact component={DashboardPage} />
				<Route path="/recoverpassword" exact component={RecoverPasswordPage} />
				<Route path="/" exact render={() => <h1>Root</h1>}>
					<Redirect to="/getstarted/json" />
				</Route>
				<Route render={() => <h1>ERROR NOT FOUND</h1>} />
			</Switch>
			{/* )} */}
		</Router>
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
