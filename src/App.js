import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as AuthProvider, Context as AuthContext } from './context/AuthContext';
import { Provider as LanguageProvider } from './context/LanguageContext';
import { Provider as AvailabilityProvider } from './context/AvailabilityContext';
import { Provider as DocProfileProvider, Context as DocProfileContext } from './context/DocProfileContext';
import { Provider as PatProfileProvider, Context as PatProfileContext } from './context/PatProfileContext';
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
	uri: 'http://localhost:10101/graphql',
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
	const { getCookie, state: { isLoggedIn, userId, userAmIHCP } } = useContext(AuthContext);
	const { getProfile } = useContext(DocProfileContext);
	const { getPatProfile } = useContext(PatProfileContext);
	useEffect(() => {
		const loadPage = async () => {
			await getCookie();
			setIsLoading(false);
			console.log(userId)	

			userAmIHCP ? getProfile(userId) : getPatProfile(userId);
		
		};
		loadPage();
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
			console.log(userId)	
			userAmIHCP ? getProfile(userId) : getPatProfile(userId);
			//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);
	return isLoading ? <LoadingScreen /> : <Router>{isLoggedIn ? <PrivateRoute /> : <PublicRoute />}</Router>;
};

const App = () => {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<AvailabilityProvider>
					<SearchDoctorProvider>
						<PatProfileProvider>
							<DocProfileProvider>
								<LanguageProvider>
									<ThemeProvider theme={theme}>
										<Routes />
									</ThemeProvider>
								</LanguageProvider>
							</DocProfileProvider>
						</PatProfileProvider>
					</SearchDoctorProvider>
				</AvailabilityProvider>
			</AuthProvider>
		</ApolloProvider>
	);
};

export default App;
