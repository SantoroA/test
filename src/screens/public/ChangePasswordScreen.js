import React from 'react';
import Navbar from '../../components/groups/Navbar';
import ChangePasswordForm from '../../components/groups/ChangePasswordForm';
import MessageDialog from '../../components/layout/MessageDialog';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#F4FAFF',
		background: 'cover',
		alignItems: 'center',
		justifyContent: 'center'
	},
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
		<div className={classes.root}>
			<Grid container className={classes.container}>
				<Grid item xs={10} sm={6} md={5} lg={4}>
					<ChangePasswordForm recToken={recToken} />
				</Grid>
			</Grid>
			<MessageDialog />
		</div>
	);
};

export default ChangePasswordScreen;
