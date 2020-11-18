import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import './App.css';

const App = () => {
	const { state: { token } } = useContext(AuthContext);
	console.log();
	if (token) {
		return <div>Your token is ok</div>;
	} else {
		return (
			<Router>
				<Switch>
					<Route path="/getstarted/json" exact component={GetStartedPage} />
					<Route path="/" exact render={() => <h1>Root</h1>} />
					<Route render={() => <h1>ERROR NOT FOUND</h1>} />
				</Switch>
			</Router>
		);
	}
};

export default () => {
	return (
		<AuthProvider>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</AuthProvider>
	);
};
