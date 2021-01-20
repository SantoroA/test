import React, { useState } from 'react';
import logo from '../../assets/dianurse-logo.png';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import ButtonOutlined from '../customUi/ButtonOutlined';
import ButtonNoBorder from '../customUi/ButtonNoBorder';

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
import Slider from '@material-ui/core/Slider';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25ch'
	},
	time: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start'
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
	},
	dialogActions: {
		width: '90%'
	},
	rating: {
		display: 'flex',
		alignItems: 'center'
	},
	star: {
		marginRight: '0.5rem'
	},
	moreFilters: {
		display: 'flex',
		flexDirection: 'column'
	},
	filter: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start'
	}
}));

const TimeFilter = () => {
	const classes = useStyles();
	const [ state, setState ] = useState({
		checkedA: true,
		checkedB: true,
		checkedC: false
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<Grid className={classes.time}>
			<FormControlLabel
				control={<Checkbox checked={state.checkedA} color="primary" onChange={handleChange} name="checkedA" />}
				label="Morning - From 6AM to 12AM"
			/>
			<FormControlLabel
				control={<Checkbox checked={state.checkedB} color="primary" onChange={handleChange} name="checkedB" />}
				label="Afternoon - From 1PM to 6PM"
			/>
			<FormControlLabel
				control={<Checkbox checked={state.checkedC} color="primary" onChange={handleChange} name="checkedC" />}
				label="Night - From 7PM to 10PM"
			/>
		</Grid>
	);
};

const PriceFilter = () => {
	const classes = useStyles();
	const [ slider, setSlider ] = useState(70);
	const [ values, setValues ] = useState({
		priceMin: '',
		priceMax: ''
	});
	const handleSlider = (event, newValue) => {
		setSlider(newValue);
	};
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	return (
		<Grid>
			<Typography>The average consultation price is $70</Typography>
			<Slider value={slider} aria-labelledby="continuous-slider" onChange={handleSlider} />
			<Grid>
				<TextField
					id="outlined1"
					label="Min Price"
					style={{ margin: 8 }}
					placeholder="$ 30.00"
					value={values.priceMin}
					onChange={handleChange('priceMin')}
					margin="dense"
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
				<TextField
					id="outlined"
					style={{ margin: 8 }}
					value={values.priceMax}
					onChange={handleChange('priceMax')}
					placeholder="Max Price"
					margin="dense"
					InputLabelProps={{
						shrink: true
					}}
					variant="outlined"
				/>
			</Grid>
		</Grid>
	);
};
const RatingFilter = () => {
	const classes = useStyles();
	const [ rate, setRate ] = useState(4.55);
	const handleChange = (event, value) => {
		setRate(value);
	};
	return (
		<Grid className={classes.rating}>
			<Rating
				name="half-rating"
				defaultValue={rate}
				precision={0.5}
				onChange={handleChange}
				className={classes.star}
			/>
			{rate}+
		</Grid>
	);
};
const MoreFilters = () => {
	const classes = useStyles();
	const [ state, setState ] = useState({
		checkedFemale: true,
		checkedMale: false,
		checkedAll: false,
		checkedPrivate: true,
		checkedPublic: false
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<Grid className={classes.moreFilters}>
			<Grid className={classes.filter}>
				<Typography>Gender</Typography>

				<Grid>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedFemale}
								color="primary"
								onChange={handleChange}
								name="checkedFemale"
							/>
						}
						label="Female"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedMale}
								color="primary"
								onChange={handleChange}
								name="checkedMale"
							/>
						}
						label="Male"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedAll}
								color="primary"
								onChange={handleChange}
								name="checkedAll"
							/>
						}
						label="All"
					/>
				</Grid>
			</Grid>

			<Divider className={classes.divider} light />
			<Grid className={classes.filter}>
				<Typography>Insurance Type</Typography>

				<Grid>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedPrivate}
								color="primary"
								onChange={handleChange}
								name="checkedPrivate"
							/>
						}
						label="Private Insurance"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedPublic}
								color="primary"
								onChange={handleChange}
								name="checkedPublic"
							/>
						}
						label="Public Insurance"
					/>
				</Grid>
			</Grid>
		</Grid>
	);
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
					<Divider className={classes.divider} />
				</DialogContent>

				<DialogActions className={classes.dialogActions}>
					<ButtonNoBorder onClick={close} color="primary" style={{ width: '100%' }}>
						Clear
					</ButtonNoBorder>
					<ButtonFilled onClick={close} color="primary" style={{ width: '100%' }}>
						Save
					</ButtonFilled>
				</DialogActions>
			</Grid>
		</Dialog>
	);
};

export default DialogFilter;
