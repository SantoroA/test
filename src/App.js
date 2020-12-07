import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import LoadingScreen from './screens/public/LoadingScreen';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'fontsource-open-sans';

const theme = createMuiTheme({
	typography: {
		fontFamily: 'Open Sans'
		// fontSize: 14
	}
});

const Routes = () => {
	const [ isLoading, setIsLoading ] = useState(true);
	const { getCookie, state: { isLoggedIn } } = useContext(AuthContext);
	useEffect(() => {
		const loadPage = async () => {
			await getCookie();
			setIsLoading(false);
		};
		loadPage();
	}, []);
	return isLoading ? <LoadingScreen /> : <Router>{isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>;
};

const App = () => {
	return (
		<AuthProvider>
			<LanguageProvider>
				<ThemeProvider theme={theme}>
					<Routes />
				</ThemeProvider>
			</LanguageProvider>
		</AuthProvider>
	);
};

export default App;
