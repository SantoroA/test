import React from 'react';
import useStyles from './style';
//CUSTOM UI
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const FormOxygen = ({ oxygenSaturation, setOxygenStaturation }) => {
	const classes = useStyles();
	return (
		<Container maxWidth="sm">
			<Typography color="textSecondary" variant="body1">
				If you have a pulse oximeter, save time by measuring you current oxygen saturation before your visit
			</Typography>

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
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormOxygen;
