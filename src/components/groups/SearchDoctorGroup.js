import React, { useEffect, useState } from 'react';
//CUSTOM UI
import TextInputRounder from '../customUi/TextInputRounder';
import ButtonIcon from '../customUi/ButtonIcon';
import FilterIcon from '../customIcons/FilterIcon';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
	formControl: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	input: {
		padding: '1rem'
	},
	submit: {
		width: '100%',
		height: '100%'
	},
	timeZone: {
		padding: '0.4rem',
		marginTop: '1.5rem',
		backgroundColor: '#D7FEF1',
		marginBottom: '1.5rem'
	},
	timeZoneForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	filter: {
		marginTop: '1.5rem',
		padding: '1rem',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	filterContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
const SearchDoctorGroup = (props) => {
	const [ timezone, setTimezone ] = useState('Eastern Time');
	const [ nameZone, setNameZone ] = useState('New York, United States');
	const classes = useStyles();
	useEffect(() => {
		const date = new Date();
		const dateAsString = date.toString();
		const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
		const nameTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		setTimezone(timezone);
		setNameZone(nameTimeZone);
	});
	return (
		<div>
			<Grid className={classes.root} container>
				<form className={classes.formControl} onSubmit={props.search}>
					<Grid item xs={4} className={classes.input}>
						<TextInputRounder
							fullWidth
							id="Speciality"
							label="Speciality"
							select
							variant="outlined"
							value={props.chooseSpeciality}
							onChange={props.changeSpeciality}
							InputLabelProps={{
								shrink: true
							}}
						>
							<MenuItem value={'Cardiologist'}>Cardiologist</MenuItem>
							<MenuItem value={'Endocrinologist'}>Endocrinologist</MenuItem>
							<MenuItem value={'Dietitian'}>Dietitian</MenuItem>
						</TextInputRounder>
					</Grid>
					<Grid item xs={2} className={classes.input}>
						<TextInputRounder
							fullWidth
							id="date"
							label="Date"
							type="date"
							variant="outlined"
							value={props.chooseDate}
							onChange={props.changeDate}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
					<Grid item xs={1} className={classes.input}>
						<ButtonIcon className={classes.submit} type="submit">
							<SearchIcon />
						</ButtonIcon>
					</Grid>
				</form>
			</Grid>
			<Divider orientation="horizontal" />

			<PaperCustomShadow className={classes.timeZone}>
				<FormControl className={classes.timeZoneForm}>
					<Typography>
						We believe you are in - {timezone} ({nameZone}) -
					</Typography>
					<TextInputRounder
						id="time"
						type="time"
						placeholder="CHANGE THE TIME ZONE"
						multiline
						InputLabelProps={{
							shrink: true
						}}
					/>
				</FormControl>
			</PaperCustomShadow>
			<Divider orientation="horizontal" />
			<Grid container className={classes.filterContainer}>
				<Grid item xs={9}>
					<PaperCustomShadow className={classes.filter}>
						<FilterIcon style={{ fontSize: '3rem', color: 'gray' }} />
						<FormControl>
							<TextInputRounder
								id="time"
								type="time"
								placeholder="Desired time"
								variant="outlined"
								style={{
									width: 200
								}}
								InputLabelProps={{
									shrink: true
								}}
							/>
						</FormControl>
						<FormControl>
							<TextInputRounder
								variant="outlined"
								label="Price"
								style={{
									width: 90
								}}
							/>
						</FormControl>
						<FormControl>
							<TextInputRounder
								variant="outlined"
								label="More filters"
								style={{
									width: 130
								}}
							/>
						</FormControl>
						<FormControl>
							<TextInputRounder
								variant="outlined"
								label="Rating"
								style={{
									width: 90
								}}
							/>
						</FormControl>
					</PaperCustomShadow>
				</Grid>
			</Grid>
		</div>
	);
};

export default SearchDoctorGroup;
