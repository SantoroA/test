import React, { useState, useContext, useEffect } from 'react';
import { Context as AvailabilityContext } from '../../../context/AvailabilityContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import FormTimeSlots from '../../groups/FormTimeSlots';
import TimeSlotList from '../../groups/TimeSlotList';
import useStyles from './style';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import DialogMessage from '../../groups/DialogMessage';
import { useTranslation } from 'react-i18next';
//CUSTOM UI
import TextInput from '../../customUi/TextInput';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useTheme } from '@material-ui/core/styles';

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
	const { getSlots, closeDialog, state } = useContext(AvailabilityContext);
	const { state: { userId } } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = (index) => {
		setValue(index);
	};
	console.log(availableStart, availableEnd);
	console.log(state);

	useEffect(() => {
		getSlots(userId);
		//  eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const { t , i18n} = useTranslation();
	return (
		<Grid container className={classes.container}>
			<Grid item md={8} xs={12}>
				<PaperCustomShadow className={classes.paper}>
					<Grid container className={classes.gridContainer}>
						<Grid item className={classes.title}>
							<Typography variant="h5">{t('Service_Availability.1')}</Typography>
						</Grid>

						<Grid container className={classes.dateContainer}>
							<Grid item xs={6} className={classes.input}>
								<TextInput
									fullWidth
									required
									type="date"
									value={availableStart}
									onChange={(e) => setAvailableStart(e.target.value)}
									label={t("Availability_from.1")}
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
									label={t("Availability_to.1")}
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<Tabs value={value} onChange={handleChange} indicatorColor="primary">
								<Tab className={classes.tab} label={t("Sun.1")} {...a11yProps(0)} />
								<Tab className={classes.tab} label={t("Mon.1")}  {...a11yProps(1)} />
								<Tab className={classes.tab} label={t("Tue.1")}  {...a11yProps(2)} />
								<Tab className={classes.tab} label={t("Wed.1")}  {...a11yProps(3)} />
								<Tab className={classes.tab} label={t("Thu.1")}  {...a11yProps(4)} />
								<Tab className={classes.tab} label={t("Fri.1")}  {...a11yProps(5)} />
								<Tab className={classes.tab} label={t("Sat.1")}  {...a11yProps(6)} />
							</Tabs>
							<SwipeableViews
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={value}
								onChangeIndex={handleChangeIndex}
							>
								<TabPanel value={value} index={0}>
									<Typography className={classes.subtitle} variant="h6">
										{t('Time_slots_Sunday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={0}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={0} weekDayName="Sunday" />
								</TabPanel>
								<TabPanel value={value} index={1}>
									<Typography className={classes.subtitle} variant="h6">
									{t('Time_slots_Monday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={1}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={1} weekDayName="Monday" />
								</TabPanel>
								<TabPanel value={value} index={2}>
									<Typography className={classes.subtitle} variant="h6">
									{t('Time_slots_Tuesday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={2}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={2} weekDayName="Tuesday" />
								</TabPanel>
								<TabPanel value={value} index={3}>
									<Typography className={classes.subtitle} variant="h6">
									{t('Time_slots_Wednesday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={3}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={3} weekDayName="Wednesday" />
								</TabPanel>
								<TabPanel value={value} index={4}>
									<Typography className={classes.subtitle} variant="h6">
									{t('Time_slots_Thursday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={4}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={4} weekDayName="Thursday" />
								</TabPanel>
								<TabPanel value={value} index={5}>
									<Typography className={classes.subtitle} variant="h6">
									{t('Time_slots_Friday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={5}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={5} weekDayName="Friday" />
								</TabPanel>
								<TabPanel value={value} index={6}>
									<Typography className={classes.subtitle} variant="h6">
									{t('Time_slots_Saturday.1')}
									</Typography>
									<FormTimeSlots
										weekDay={6}
										availableEnd={availableEnd}
										availableStart={availableStart}
									/>
									<TimeSlotList weekDay={6} weekDayName="Saturday" />
								</TabPanel>
							</SwipeableViews>
						</Grid>
					</Grid>
				</PaperCustomShadow>
			</Grid>
			<DialogMessage open={state.dialogOpen} message={state.dialogMessage} close={closeDialog} />
		</Grid>
	);
};

export default TabAvailability;
