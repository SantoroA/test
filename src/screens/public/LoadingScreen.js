import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';

const LoadingScreen = () => {
	return (
		<Container>
			<Grid style={{ height: '100vh' }} direction="row" justify="center" alignItems="center" container>
				<Loader type="TailSpin" color="black" height={80} width={80} />
			</Grid>
		</Container>
	);
};

export default LoadingScreen;
