import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
		marginBottom: '1rem',
		borderRadius: '8px',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)',
		padding: '1rem',
		justifyContent: 'space-between',
		'& .react-calendar': {
			border: 'none',
			backgroundColor: 'none',
			maxWidth: '100%'
		},
		'& .react-calendar__navigation': {
			height: '2.5rem',
			marginBottom: '1rem'
		},
		'& .react-calendar__navigation button': {
			minWidth: '1.5rem',
			background: 'none'
		},
		'& .react-calendar button': {
			border: 'none',
			marginRight: 0,
			marginLeft: 0,
			marginBottom: 0,
			marginTop: '0.4rem',
			outline: 'none'
		},
		'& .react-calendar__month-view__weekdays': {
			textAlign: 'center',
			textTransform: 'none',
			fontSize: '0.75rem',
			fontWeight: 'bold',
			'& abbr': {
				textDecoration: 'none'
			}
		},
		'& .react-calendar__month-view__weekdays__weekday': {
			padding: '0.5rem'
		},
		'& .react-calendar__tile': {
			textAlign: 'center',
			padding: '0.4em',
			background: 'none',
			marginBottom: '0.5em',
			'&:hover': {
				backgroundColor: '#0BC7E0',
				cursor: 'pointer',
				color: '#fff',
				borderRadius: '5px'
			}
		},
		'& .react-calendar__tile--active': {
			backgroundColor: '#27B669',
			color: '#fff',
			borderRadius: '5px'
		},
		'& .react-calendar__month-view__days__day--weekend': {
			color: '#d10000'
		}
	}
});

const CalendarApp = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Calendar {...props} />
		</div>
	);
};

export default CalendarApp;
