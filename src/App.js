import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import { Provider as AvailabilityProvider } from './context/AvailabilityContext';
import { Provider as DocProfileProvider } from './context/DocProfileContext';
import { Provider as SearchDoctorProvider } from './context/SearchDoctorContext';
import LoadingScreen from './screens/public/LoadingScreen';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'fontsource-roboto';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// PROVIDE URL OF RUNNING GRAPHQL SERVER

const client = new ApolloClient({
	uri: 'http://localhost:10101/dianurse/v1/graphql',
	cache: new InMemoryCache()
});

const theme = createMuiTheme({
	typography: {
		fontFamily: 'Roboto'
	},
	palette: {
		primary: {
			main: '#07B597'
		}
	}
});

const Routes = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const { getCookie, state: { isLoggedIn } } = useContext(AuthContext);
	useEffect(() => {
		const loadPage = async () => {
			await getCookie();
			setIsLoading(false);
		};
		loadPage();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return isLoading ? <LoadingScreen /> : <Router>{isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>;
};

const App = () => {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<AvailabilityProvider>
					<SearchDoctorProvider>
						<DocProfileProvider>
							<LanguageProvider>
								<ThemeProvider theme={theme}>
									<Routes />
								</ThemeProvider>
							</LanguageProvider>
						</DocProfileProvider>
					</SearchDoctorProvider>
				</AvailabilityProvider>
			</AuthProvider>
		</ApolloProvider>
	);
};

export default App;
