import React, { useState, Fragment } from 'react';
import TimeFilter from './TimeFilter';
import RatingFilter from './RatingFilter';
import MoreFilters from './MoreFilters';
import PriceFilter from './PriceFilter';
import useStyles from './style';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonNoBorder from '../../customUi/ButtonNoBorder';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

const DialogFilter = ({ isOpen, close, type, filterState, setFilterState }) => {
	const classes = useStyles();
	const handleClear = () => {
		close();
		setFilterState({
			...filterState,
			gender: 3,
			time: 'all',
			insurance: 3,
			minPrice: 70,
			maxPrice: 150,
			rating: 0.1
		});
	};
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
					<ButtonNoBorder onClick={handleClear}>Clear All</ButtonNoBorder>
					<ButtonFilled onClick={close} color="primary">
						Ok
					</ButtonFilled>
				</DialogActions>
			</Grid>
		</Dialog>
	);
};

export default DialogFilter;
