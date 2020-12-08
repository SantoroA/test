import React from 'react';
import Navbar from '../../components/layout/Navbar';
import ChangePasswordForm from '../../components/groups/ChangePasswordForm';
import MessageDialog from '../../components/layout/MessageDialog';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '2em',
		flexDirection: 'row',
		marginTop: '3em'
	}
}));

const ChangePasswordScreen = (props) => {
	const classes = useStyles();
	const { recToken } = props.match.params;

	return (
		<div>
			<Navbar />
			<Container>
				<Grid container className={classes.container}>
					<Grid item xs={12} sm={6} md={4}>
						<ChangePasswordForm recToken={recToken} />
					</Grid>
				</Grid>
				<MessageDialog />
			</Container>
		</div>
	);
};

export default ChangePasswordScreen;
