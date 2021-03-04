import React, { Fragment } from 'react';
import useStyles from './style';
//MATERIAL UI
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RatingFilter = ({ filterState, setFilterState }) => {
	const classes = useStyles();
	// console.log(filterState.rating);
	return (
		<Grid className={classes.rating}>
			<FormControl component="fieldset">
				<FormLabel component="legend">Rating</FormLabel>
				<RadioGroup
					aria-label="rating"
					name="rating"
					defaultValue={0.1}
					value={filterState.rating}
					onChange={(e) => setFilterState({ ...filterState, rating: parseFloat(e.target.value) })}
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

export default RatingFilter;
