import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

// theming
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '12rem',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},
	button: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column'
	}
});

const DocUserOptions = () => {
	const classes = useStyles();
	const [ state, setState ] = useState({
		checkedPublic: false,
		checkedPrivate: true
	});

	const { state: { userName } } = useContext(AuthContext);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<Paper elevation="0" className={classes.root}>
			{/* to be dynamic later, the doc should click on reviews */}

			<Rating name="read-only" value={0} readOnly />
			<Typography variant="subtitle1">(0 reviews)</Typography>

			<ButtonFilled>
				<div className={classes.button}>
					<Typography variant="body1" className={classes.price}>
						Price from
					</Typography>
					<Typography variant="h5">LV 00.00</Typography>
				</div>
			</ButtonFilled>
			<FormGroup row>
				<FormControlLabel
					control={
						<Switch
							checked={state.checkedPrivate}
							onChange={handleChange}
							name="checkedPrivate"
							color="primary"
						/>
					}
					label="Private profile"
				/>
			</FormGroup>
		</Paper>
	);
};

export default DocUserOptions;
