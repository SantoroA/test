import React, { useState } from 'react';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
import FormTimeSlots from '../groups/FormTimeSlots';
import TimeSlotList from '../groups/TimeSlotList';
import dianurseApi from '../../api/dianurseApi';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
import ButtonFilled from '../customUi/ButtonFilled';
import ButtonOutlined from '../customUi/ButtonOutlined';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
import Dropdown from '../customUi/Dropdown';
//MATERIAL UI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
	container: {
		alignItems: 'flex-start',
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
	title: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.5rem'
	},
	tab: {
		minWidth: '14%'
	}
});

//TAB PANEL
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

//MAIN FUNCTION

const TabAvailability = () => {
	const [ value, setValue ] = useState(0);
	const classes = useStyles();
	const theme = useTheme();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = (index) => {
		setValue(index);
	};
	return (
		<Grid container fullWidth className={classes.container}>
			<Grid item md={8} xs={12}>
				<PaperCustomShadow className={classes.paper}>
					<Grid container className={classes.gridContainer}>
						<Grid item className={classes.title}>
							<Typography variant="h5">Service Availability</Typography>
							<IconButton>
								<EditIcon onClick={() => {}} />
							</IconButton>
						</Grid>
						<Grid item>
							<Tabs value={value} onChange={handleChange} indicatorColor="primary">
								<Tab className={classes.tab} label="Sun" {...a11yProps(0)} />
								<Tab className={classes.tab} label="Mon" {...a11yProps(1)} />
								<Tab className={classes.tab} label="Tue" {...a11yProps(2)} />
								<Tab className={classes.tab} label="Wed" {...a11yProps(3)} />
								<Tab className={classes.tab} label="Thu" {...a11yProps(4)} />
								<Tab className={classes.tab} label="Fri" {...a11yProps(5)} />
								<Tab className={classes.tab} label="Sat" {...a11yProps(6)} />
							</Tabs>
							<SwipeableViews
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={value}
								onChangeIndex={handleChangeIndex}
							>
								<TabPanel value={value} index={0}>
									<Typography variant="h6">Time Slots for Sunday</Typography>
									<FormTimeSlots weekDay={0} />
									<TimeSlotList weekDay={0} />
								</TabPanel>
								<TabPanel value={value} index={1}>
									<Typography variant="h6">Time Slots for Monday</Typography>
									<FormTimeSlots weekDay={1} />
								</TabPanel>
								<TabPanel value={value} index={2}>
									<Typography variant="h6">Time Slots for Tuesday</Typography>
									<FormTimeSlots weekDay={2} />
								</TabPanel>
								<TabPanel value={value} index={3}>
									<Typography variant="h6">Time Slots for Wednesday</Typography>
									<FormTimeSlots weekDay={3} />
								</TabPanel>
								<TabPanel value={value} index={4}>
									<Typography variant="h6">Time Slots for Thursday</Typography>
									<FormTimeSlots weekDay={4} />
								</TabPanel>
								<TabPanel value={value} index={5}>
									<Typography variant="h6">Time Slots for Friday</Typography>
									<FormTimeSlots weekDay={5} />
								</TabPanel>
								<TabPanel value={value} index={6}>
									<Typography variant="h6">Time Slots for Saturday</Typography>
									<FormTimeSlots weekDay={6} />
								</TabPanel>
							</SwipeableViews>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
		</Grid>
	);
};

export default TabAvailability;
