import React, { useState, useContext, useEffect } from 'react';
import { Context as AvailabilityContext } from '../../context/AvailabilityContext';
import { Context as AuthContext } from '../../context/AuthContext';
import FormTimeSlots from '../groups/FormTimeSlots';
import TimeSlotList from '../groups/TimeSlotList';
import dianurseApi from '../../api/dianurseApi';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import MessageDialogAvailability from '../groups/MessageDialogAvailability';
//CUSTOM UI
import TextInput from '../customUi/TextInput';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
	},
	input: {
		padding: '0.5rem'
	},
	box: {
		padding: '1rem',
		justifyContent: 'center',
		borderColor: 'rgba(160, 164, 168, 1)',
		width: '100%'
	},
	dateContainer: {
		marginTop: '2rem',
		marginBottom: '3rem'
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
	const [ availableStart, setAvailableStart ] = useState('');
	const [ availableEnd, setAvailableEnd ] = useState('');
	const classes = useStyles();
	const theme = useTheme();
	const { getSlots, state } = useContext(AvailabilityContext);
	// const { userId } = useContext(AuthContext);
	const userId = '5fe8b0c48bef090026e253b7';

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = (index) => {
		setValue(index);
	};
	console.log(availableStart, availableEnd);
	console.log(state)

	useEffect(() => {
		getSlots(userId);
	}, []);

	return (
		<Grid container className={classes.container}>
			<Grid item md={8} xs={12}>
				<PaperCustomShadow className={classes.paper}>
					<Grid container className={classes.gridContainer}>
						<Grid item className={classes.title}>
							<Typography variant="h5">Service Availability</Typography>
						</Grid>
						<Box borderRadius="10px" border={1} className={classes.box}>
							<Grid container className={classes.dateContainer}>
								<Grid item xs={6} className={classes.input}>
									<TextInput
										fullWidth
										required
										type="date"
										value={availableStart}
										onChange={(e) => setAvailableStart(e.target.value)}
										label="Availability from"
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
								</Grid>
								<Grid item xs={6} className={classes.input}>
									<TextInput
										fullWidth
										required
										type="date"
										value={availableEnd}
										onChange={(e) => setAvailableEnd(e.target.value)}
										label="Availability to"
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
								</Grid>
							</Grid>
							<Divider />
							<Grid item xs={12}>
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
										<FormTimeSlots
											weekDay={0}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={0} />
									</TabPanel>
									<TabPanel value={value} index={1}>
										<Typography variant="h6">Time Slots for Monday</Typography>
										<FormTimeSlots
											weekDay={1}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={1} />
									</TabPanel>
									<TabPanel value={value} index={2}>
										<Typography variant="h6">Time Slots for Tuesday</Typography>
										<FormTimeSlots
											weekDay={2}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={2} />
									</TabPanel>
									<TabPanel value={value} index={3}>
										<Typography variant="h6">Time Slots for Wednesday</Typography>
										<FormTimeSlots
											weekDay={3}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={3} />
									</TabPanel>
									<TabPanel value={value} index={4}>
										<Typography variant="h6">Time Slots for Thursday</Typography>
										<FormTimeSlots
											weekDay={4}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={4} />
									</TabPanel>
									<TabPanel value={value} index={5}>
										<Typography variant="h6">Time Slots for Friday</Typography>
										<FormTimeSlots
											weekDay={5}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={5} />
									</TabPanel>
									<TabPanel value={value} index={6}>
										<Typography variant="h6">Time Slots for Saturday</Typography>
										<FormTimeSlots
											weekDay={6}
											availableEnd={availableEnd}
											availableStart={availableStart}
										/>
										<TimeSlotList weekDay={6} />
									</TabPanel>
								</SwipeableViews>
							</Grid>
						</Box>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<MessageDialogAvailability />
		</Grid>
	);
};

export default TabAvailability;
