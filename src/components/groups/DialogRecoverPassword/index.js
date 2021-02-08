import React, { useState } from 'react';
import logo from '../../../assets/dianurse-logo.png';
import useStyles from './style';
//CUSTON UI
import ButtonFilled from '../../customUi/ButtonFilled';
import TextInput from '../../customUi/TextInput';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const DialogRecoverPassword = ({ passwordRecoveryOpen, togglePasswordRecoveryOpen, recoverPassword }) => {
	const classes = useStyles();
	const [ email, setEmail ] = useState('');
	return (
		<Dialog open={passwordRecoveryOpen} onClose={togglePasswordRecoveryOpen} aria-labelledby="form-dialog-title">
			<Grid className={classes.layout}>
				<img src={logo} alt="Logo" className={classes.logo} />
				<Divider className={classes.divider} />

				<DialogContent>
					<DialogContentText variant="body2">
						Enter your e-mail address and we will send you a link to reset your password
					</DialogContentText>
					<TextInput
						value={email}
						variant="outlined"
						onChange={(e) => setEmail(e.target.value)}
						required
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<ButtonFilled
						onClick={() => {
							togglePasswordRecoveryOpen();
							recoverPassword({ email });
						}}
						color="primary"
					>
						Recover My Password
					</ButtonFilled>
				</DialogActions>
			</Grid>
		</Dialog>
	);
};

export default DialogRecoverPassword;
