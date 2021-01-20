import React, { useState } from 'react';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import ButtonOutlined from '../customUi/ButtonOutlined';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	logo: {
		width: '8rem',
		marginBottom: '2rem'
	},
	divider: {
		marginTop: '1rem',
		marginBottom: '1rem'
	},
	closeButton: {
		alignSelf: 'flex-end'
	}
});

const TimeFilter = () => {
	const [ state, setState ] = useState({
		checkedA: true,
		checkedB: true,
		checkedF: true,
		checkedG: true
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<div>
			<FormControlLabel
				control={<Checkbox checked={state.checkedA} color="primary" onChange={handleChange} name="checkedA" />}
				label="Morning"
			/>
			<FormControlLabel
				control={<Checkbox checked={state.checkedB} color="primary" onChange={handleChange} name="checkedB" />}
				label="Afternoon"
			/>
		</div>
	);
};

const PriceFilter = () => {
	return <Typography>Place price filter here</Typography>;
};
const RatingFilter = () => {
	return <Typography>Place rating filter here</Typography>;
};
const MoreFilters = () => {
	return <Typography>Place more filters here</Typography>;
};

const DialogFilter = ({ isOpen, close, type }) => {
	const classes = useStyles();
	return (
		<Dialog
			open={isOpen}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<Grid className={classes.layout}>
				<IconButton className={classes.closeButton} onClick={close} color="primary">
					<CloseIcon />
				</IconButton>

				<DialogContent>
					{type === 'time' && <TimeFilter />}
					{type === 'price' && <PriceFilter />}
					{type === 'rating' && <RatingFilter />}
					{type === 'more' && <MoreFilters />}
				</DialogContent>
				<Divider className={classes.divider} />
				<DialogActions>
					<ButtonOutlined onClick={close} color="primary">
						Clear
					</ButtonOutlined>
					<ButtonFilled onClick={close} color="primary">
						Save
					</ButtonFilled>
				</DialogActions>
			</Grid>
		</Dialog>
	);
};

export default DialogFilter;
