import React from 'react';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const FormOxygen = ({ onSubmitForm, submitText, oxygenSaturation, setOxygenStaturation }) => {
	const classes = useStyles();
	return (
		<Container maxWidth="sm">
			<Typography color="textSecondary" variant="body1">
				If you have a pulse oximeter, save time by measuring you current oxygen saturation before your visit
			</Typography>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onSubmitForm();
				}}
			>
				<PaperCustomShadow className={classes.paper}>
					<Grid container className={classes.yesNoButtons}>
						<Grid item xs={12}>
							<Typography className={classes.sub} variant="h6">
								Oxygen Saturation Level
							</Typography>
						</Grid>
						<Grid className={classes.buttonOutlined} item xs={9}>
							<TextField
								type="number"
								fullWidth
								placeholder="Enter value (%)"
								value={oxygenSaturation}
								variant="outlined"
								onChange={(e) => setOxygenStaturation(e.target.value)}
							/>
						</Grid>
						<Grid container className={classes.buttonWrapper}>
							<Grid item xs={5} sm={3}>
								<ButtonNoBorder className={classes.skipButton} onClick={onSubmitForm}>
									<Typography>Skip question</Typography>
								</ButtonNoBorder>
							</Grid>
							<Grid item xs={5} sm={3}>
								<ButtonFilled fullWidth className={classes.nextButton} type="submit">
									{submitText}
								</ButtonFilled>
							</Grid>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</form>
		</Container>
	);
};

export default FormOxygen;
