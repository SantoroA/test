import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
