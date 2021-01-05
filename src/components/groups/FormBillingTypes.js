import React, { useState } from 'react';
import useToggle from '../../hooks/useToggle';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import ToggleButtonCustom from '../customUi/ToggleButtonCustom';
import ButtonOutlined from '../customUi/ButtonOutlined';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	paper: {
		width: '100%',
		padding: '1.5rem',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center'
	},
	gridContainer: {
		justifyContent: 'center'
	},
	form: {
		width: '100%',
		justifyContent: 'center'
	},

	title: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5rem'
	},
	buttons: {
		marginTop: '1.5rem',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		padding: '0.5rem'
	},

	selects: {
		padding: '0.5rem'
	},
	toggleButton: {
		marginRight: '1rem',
		paddingRight: '1rem',
		paddingLeft: '1rem'
	},
	subtitle: {
		padding: '0.5rem'
	}
});

const FormBillingTypes = () => {
	const [ isInsurance, toggleIsInsurance ] = useToggle(false);
	const [ isPrivate, toggleIsPrivate ] = useToggle(false);
	const [ isSelfPayer, toggleIsSelfPayer ] = useToggle(false);
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	return (
		<Container fullWidth className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Billing Types</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid container>
							<Typography className={classes.subtitle} variant="body1">
								Select Type
							</Typography>
							<Grid item xs={12} className={classes.selects}>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isInsurance}
									onChange={toggleIsInsurance}
								>
									Statutory health insurance patients
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isPrivate}
									onChange={toggleIsPrivate}
								>
									Private patients
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isSelfPayer}
									onChange={toggleIsSelfPayer}
								>
									Self-payers
								</ToggleButtonCustom>
							</Grid>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
										}}
										fullWidth
										variant="outlined"
									>
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
										Update
									</ButtonFilled>
								</Grid>
							</Grid>
						)}
					</form>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormBillingTypes;
