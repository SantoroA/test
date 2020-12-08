import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
//CUSTOM UI

//MATERIAL UI
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// theming
const useStyles = makeStyles({
	body: {
		display: 'flex',
		textAlign: 'center',
		fontWeight: '600',
		backgroundColor: '#d8eaf4',
		marginTop: '1.5em',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	text: {
		justifyContent: 'center',
		marginTop: '2em',
		marginBottom: '1em'
	},
	avatar: {
		marginRight: '1em',
		marginTop: '3.5em'
	},
	price: {
		color: '#fff',
		backgroundColor: '#166cbc',
		marginRight: '0'
	},
	firstBlock: {
		display: 'flex',
		flexDirection: 'row'
	},
	secondBlock: {
		margin: (8, 0, 8, 20)
	},
	rating: {
		display: 'flex'
	}
});

const DocDashUserInfo = () => {
	const classes = useStyles();
	const [ state, setState ] = useState({
		checkedPublic: false,
		checkedPrivate: true
	});
	const [ menu, setMenu ] = useState(null);
	const open = Boolean(menu);
	const { state: { userName } } = useContext(AuthContext);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<div>
			<div className={classes.body}>
				<div className={classes.firstBlock}>
					<Avatar className={classes.avatar} />
					{/* fetch the foto as url- it's received from the back-end  */}
					{/* get data request and display the response from the back-end on the page */}
					<Typography variant="h4" className={classes.text}>
						{userName}
						<Typography className={classes.text} variant="body1">
							Specialty:
						</Typography>
					</Typography>
				</div>
				<div className={classes.secondBlock}>
					{/* to be dynamic later, the doc should click on reviews */}
					<div className={classes.rating}>
						<Rating name="read-only" value={0} readOnly />
						<Typography variant="subtitle1">(0 reviews)</Typography>
					</div>
					<Typography variant="subtitle1" className={classes.price}>
						<p>
							Price from <br />
							<b>LV 00.00</b>
						</p>
					</Typography>
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
				</div>
			</div>
		</div>
	);
};

export default DocDashUserInfo;
