import React, { useState } from 'react';
import useStyles from './style';
//CUSTOM UI
import TextInput from '../../customUi/TextInput';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

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

export default PriceFilter;
