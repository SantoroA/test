import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonFilled from '../customUi/ButtonFilled';

const useStyles = makeStyles({
	navigation: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem'
	},

	active: {
		background: '#0BC7E0',
		color: 'white',
		border: '1px solid #0BC7E0',
		padding: '6px 12px',
		borderRadius: '10px',
		fontWeight: 'bold',
		margin: '0 5px'
	},
	btn: {
		color: '#05B240',
		textDecoration: 'none',
		padding: '6px 12px',
		border: '1px solid #05B240',
		backgroundColor: 'transparent',
		borderRadius: '10px',
		fontWeight: 'bold',
		cursor: 'pointer',
		margin: '0 5px',
		'&:active': {
			background: '#0BC7E0',
			color: 'white',
			border: '1px solid #0BC7E0'
		},
		'&:hover': {
			background: '#0BC7E0',
			color: 'white',
			border: '1px solid #0BC7E0'
		}
	}
});

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
	const classes = useStyles();
	const [ counter, setConuter ] = useState(1);
	const [ numberOfButtons, setNumberOfButtons ] = useState(Math.ceil(total / showPerPage));

	useEffect(
		() => {
			const value = showPerPage * counter;
			onPaginationChange(value - showPerPage, value);
		},
		[ counter ]
	);

	const onButtonClick = (type) => {
		if (type === 'prev') {
			if (counter === 1) {
				setConuter(1);
			} else {
				setConuter(counter - 1);
			}
		} else if (type === 'next') {
			if (numberOfButtons === counter) {
				setConuter(counter);
			} else {
				setConuter(counter + 1);
			}
		}
	};
	return (
		<nav className={classes.navigation}>
			<ButtonFilled onClick={() => onButtonClick('prev')}>Prev</ButtonFilled>

			{new Array(numberOfButtons).fill('').map((el, index) => (
				<button
					className={`${index + 1 === counter ? classes.active : classes.btn}`}
					onClick={() => setConuter(index + 1)}
				>
					{index + 1}
				</button>
			))}
			<ButtonFilled onClick={() => onButtonClick('next')}>Next</ButtonFilled>
		</nav>
	);
};

export default Pagination;
