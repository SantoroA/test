import React, { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import DialogMessage from '../../components/groups/DialogMessage';
import FormChangePassword from '../../components/groups/FormChangePassword';
//MATERIAL UI
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
	const { state: { dialogMessage, dialogOpen }, closeDialog } = useContext(AuthContext);
	return (
		<div className={classes.root}>
			<Grid container className={classes.container}>
				<Grid item xs={10} sm={6} md={5} lg={4}>
					<FormChangePassword recToken={recToken} />
				</Grid>
			</Grid>
			<DialogMessage open={dialogOpen} message={dialogMessage} close={closeDialog} />
		</div>
	);
};

export default ChangePasswordScreen;
