import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import GetStartedPage from './pages/GetStartedPage';
import HomePage from './pages/HomePage';
import './App.css';

const Routes = () => {
	const { state: { isLoggedIn } } = useContext(AuthContext);

	return (
		<Router>
			{isLoggedIn ? (
				<HomePage />
			) : (
				<Switch>
					<Route path="/getstarted/json" exact component={GetStartedPage} />
					<Route path="/" exact render={() => <h1>Root</h1>} />
					<Route render={() => <h1>ERROR NOT FOUND</h1>} />
				</Switch>
			)}
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
