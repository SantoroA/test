import React from 'react';
//CUSTOM UI
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	section: {
		marginTop: '1rem',
		padding: '1.5rem'
	},
	input: {
		padding: '0.5rem'
	}
});

const FormPayment = ({ paymentOptions, handleChangePaymentOptions }) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.root}>
			<Grid item>
				<PaperCustomShadow className={classes.section}>
					<Grid container>
						<Grid item className={classes.input} xs={12}>
							<TextField
								type="number"
								fullWidth
								label="Card Number"
								value={paymentOptions.cardNumber}
								variant="outlined"
								onChange={handleChangePaymentOptions}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} sm={6}>
							<TextField
								type="number"
								fullWidth
								label="Expiration"
								value={paymentOptions.expiration}
								variant="outlined"
								onChange={handleChangePaymentOptions}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} sm={6}>
							<TextField
								type="number"
								fullWidth
								label="CCV"
								value={paymentOptions.ccv}
								variant="outlined"
								onChange={handleChangePaymentOptions}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} sm={6}>
							<TextField
								type="number"
								fullWidth
								label="Billing Zip Code"
								value={paymentOptions.billingZipCode}
								variant="outlined"
								onChange={handleChangePaymentOptions}
							/>
						</Grid>
						<Grid item className={classes.input} xs={12} sm={6}>
							<TextField
								type="number"
								fullWidth
								label="Country"
								value={paymentOptions.country}
								variant="outlined"
								onChange={handleChangePaymentOptions}
							/>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
		</Grid>
	);
};

export default FormPayment;
