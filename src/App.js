import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import './App.css';

const Routes = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const { getCookie, state: { isLoggedIn } } = useContext(AuthContext);
	useEffect(() => {
		getCookie();
		setIsLoading(false);
	}, []);
	return isLoading ? (
		<Loader type="TailSpin" color="black" height={50} width={50} />
	) : (
		<Router>{isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>
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
