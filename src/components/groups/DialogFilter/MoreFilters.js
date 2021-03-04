import React from 'react';
import useStyles from './style';
//MATERIAL UI
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
// import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';

const MoreFilters = ({ filterState, setFilterState }) => {
	const classes = useStyles();
	// console.log(filterState.gender);
	return (
		<Grid container className={classes.moreFilters}>
			<FormControl component="fieldset">
				<FormLabel component="legend">Gender</FormLabel>
				<RadioGroup
					aria-label="gender"
					name="gender"
					value={filterState.gender}
					onChange={(e) => setFilterState({ ...filterState, gender: parseInt(e.target.value) })}
				>
					<Grid container className={classes.filter}>
						<FormControlLabel value={1} control={<Radio color="primary" />} label="Female" />
						<FormControlLabel value={0} control={<Radio color="primary" />} label="Male" />
						<FormControlLabel value={2} control={<Radio color="primary" />} label="All" />
					</Grid>
				</RadioGroup>
			</FormControl>

			{/* <Divider className={classes.divider} light />
			<Grid className={classes.filter}>
				<FormControl component="fieldset">
					<FormLabel component="legend">Insurance Type</FormLabel>
					<RadioGroup
						aria-label="insurance"
						name="insurance"
						value={filterState.insurance}
						onChange={(e) => setFilterState({ ...filterState, insurance: parseInt(e.target.value) })}
					>
						<Grid container className={classes.filter}>
							<FormControlLabel value={1} control={<Radio color="primary" />} label="Public Insurance" />
							<FormControlLabel value={0} control={<Radio color="primary" />} label="Private Insurance" />
							<FormControlLabel value={2} control={<Radio color="primary" />} label="All" />
						</Grid>
					</RadioGroup>
				</FormControl>
			</Grid> */}
		</Grid>
	);
};

export default MoreFilters;
