import React, { useState, Fragment } from 'react';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import TextInput from '../customUi/TextInput';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FormLabel from '@material-ui/core/FormLabel';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		textAlign: 'center'
	},
	input: {
		padding: '0.5rem'
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
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rates: {
		alignItems: 'center'
	}
}));

const TimeFilter = ({ filterState, setFilterState }) => {
	const classes = useStyles();

	const handleChange = (e) => {
		setFilterState({ ...filterState, timeFrame: e.target.value });
	};
	return (
		<Grid className={classes.time}>
			<FormControl component="fieldset">
				<FormLabel component="legend">Time Frame</FormLabel>
				<RadioGroup
					aria-label="time-frame"
					name="time-frame"
					value={filterState.timeFrame}
					onChange={handleChange}
				>
					<FormControlLabel
						value="morning"
						control={<Radio color="primary" />}
						label="Morning - From 6:00 to 11:59"
					/>
					<FormControlLabel
						value="afternoon"
						control={<Radio color="primary" />}
						label="Afternoon - From 12:00 to 17:59"
					/>
					<FormControlLabel
						value="evening"
						control={<Radio color="primary" />}
						label="Night - From 18:00 to 22:00"
					/>
				</RadioGroup>
			</FormControl>
		</Grid>
	);
};

const PriceFilter = ({ filterState, setFilterState }) => {
	const classes = useStyles();
	const [ sliderValue, setSliderValue ] = useState([ filterState.minPrice, filterState.maxPrice ]);
	const handleSlider = (event, newValue) => {
		setSliderValue(newValue);
		setFilterState({ ...filterState, minPrice: newValue[0], maxPrice: newValue[1] });
	};
	function valuetext(value) {
		return `$${value}`;
	}
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography id="range-slider" gutterBottom>
					Consultation Price
				</Typography>
				<Slider
					value={sliderValue}
					onChange={handleSlider}
					valueLabelDisplay="auto"
					aria-labelledby="range-slider"
					getAriaValueText={valuetext}
					max={200}
				/>
			</Grid>

			<Grid item xs={6} className={classes.input}>
				<TextInput
					label="Min Price"
					value={filterState.minPrice}
					onChange={(e) => setFilterState({ ...filterState, minPrice: e.target.value })}
					margin="dense"
					variant="outlined"
				/>
			</Grid>
			<Grid item xs={6} className={classes.input}>
				<TextInput
					label="Max Price"
					value={filterState.maxPrice}
					onChange={(e) => setFilterState({ ...filterState, maxPrice: e.target.value })}
					placeholder="Max Price"
					margin="dense"
					variant="outlined"
				/>
			</Grid>
		</Grid>
	);
};

const RatingFilter = ({ filterState, setFilterState }) => {
	const classes = useStyles();
	console.log(filterState.rating);
	return (
		<Grid className={classes.rating}>
			<FormControl component="fieldset">
				<FormLabel component="legend">Rating</FormLabel>
				<RadioGroup
					aria-label="rating"
					name="rating"
					value={filterState.rating}
					onChange={(e) => setFilterState({ ...filterState, rating: e.target.value })}
				>
					<FormControlLabel
						value={3}
						control={<Radio color="primary" />}
						label={
							<Fragment>
								<Grid container className={classes.rates}>
									<Box component="fieldset" borderColor="transparent" className={classes.rating}>
										<Rating
											readOnly
											precision={0.5}
											name="rating"
											value={3}
											emptyIcon={<StarBorderIcon fontSize="inherit" />}
										/>
									</Box>
									<Typography component="legend" variant="body2">
										3+
									</Typography>
								</Grid>
							</Fragment>
						}
					/>
					<FormControlLabel
						value={3.5}
						control={<Radio color="primary" />}
						label={
							<Fragment>
								<Grid container className={classes.rates}>
									<Box component="fieldset" borderColor="transparent" className={classes.rating}>
										<Rating
											readOnly
											precision={0.5}
											name="rating"
											value={3.5}
											emptyIcon={<StarBorderIcon fontSize="inherit" />}
										/>
									</Box>
									<Typography component="legend" variant="body2">
										3.5+
									</Typography>
								</Grid>
							</Fragment>
						}
					/>
					<FormControlLabel
						value={4}
						control={<Radio color="primary" />}
						label={
							<Fragment>
								<Grid container className={classes.rates}>
									<Box component="fieldset" borderColor="transparent" className={classes.rating}>
										<Rating
											readOnly
											precision={0.5}
											name="rating"
											value={4}
											emptyIcon={<StarBorderIcon fontSize="inherit" />}
										/>
									</Box>
									<Typography component="legend" variant="body2">
										4+
									</Typography>
								</Grid>
							</Fragment>
						}
					/>
					<FormControlLabel
						value={4.5}
						control={<Radio color="primary" />}
						label={
							<Fragment>
								<Grid container className={classes.rates}>
									<Box component="fieldset" borderColor="transparent" className={classes.rating}>
										<Rating
											readOnly
											precision={0.5}
											name="rating"
											value={4.5}
											emptyIcon={<StarBorderIcon fontSize="inherit" />}
										/>
									</Box>
									<Typography component="legend" variant="body2">
										4.5+
									</Typography>
								</Grid>
							</Fragment>
						}
					/>
				</RadioGroup>
			</FormControl>
		</Grid>
	);
};
const MoreFilters = ({ filterState, setFilterState }) => {
	const classes = useStyles();

	return (
		<Grid container className={classes.moreFilters}>
			<FormControl component="fieldset">
				<FormLabel component="legend">Gender</FormLabel>
				<RadioGroup
					aria-label="gender"
					name="gender"
					value={filterState.gender}
					onChange={(e) => setFilterState({ ...filterState, gender: e.target.value })}
				>
					<Grid container className={classes.filter}>
						<FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
						<FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
						<FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
					</Grid>
				</RadioGroup>
			</FormControl>

			<Divider className={classes.divider} light />
			<Grid className={classes.filter}>
				<FormControl component="fieldset">
					<FormLabel component="legend">Insurance Type</FormLabel>
					<RadioGroup
						aria-label="insurance"
						name="insurance"
						value={filterState.insurance}
						onChange={(e) => setFilterState({ ...filterState, insurance: e.target.value })}
					>
						<Grid container className={classes.filter}>
							<FormControlLabel
								value="public"
								control={<Radio color="primary" />}
								label="Public Insurance"
							/>
							<FormControlLabel
								value="private"
								control={<Radio color="primary" />}
								label="Private Insurance"
							/>
							<FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
						</Grid>
					</RadioGroup>
				</FormControl>
			</Grid>
		</Grid>
	);
};

const DialogFilter = ({ isOpen, close, type, filterState, setFilterState }) => {
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
					{type === 'time' && <TimeFilter filterState={filterState} setFilterState={setFilterState} />}
					{type === 'price' && <PriceFilter filterState={filterState} setFilterState={setFilterState} />}
					{type === 'rating' && <RatingFilter filterState={filterState} setFilterState={setFilterState} />}
					{type === 'more' && <MoreFilters filterState={filterState} setFilterState={setFilterState} />}
					<Divider className={classes.divider} />
				</DialogContent>

				<DialogActions className={classes.dialogActions}>
					<ButtonFilled onClick={close} color="primary">
						Ok
					</ButtonFilled>
				</DialogActions>
			</Grid>
		</Dialog>
	);
};

export default DialogFilter;
