import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import './App.css';

const Routes = () => {
	const { state: { isLoggedIn } } = useContext(AuthContext);
	return <Router>{isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>;
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
