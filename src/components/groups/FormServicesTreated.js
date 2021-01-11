import React, { useState } from 'react';
import useToggle from '../../hooks/useToggle';
import dianurseApi from '../../api/dianurseApi';
//CUSTOM UI
import ButtonFilled from '../customUi/ButtonFilled';
import ToggleButtonCustom from '../customUi/ToggleButtonCustom';
import ButtonOutlined from '../customUi/ButtonOutlined';
import PaperCustomShadow from '../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		alignItems: 'center',
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
	form: {
		width: '100%',
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
	buttons: {
		marginTop: '1.5rem',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	button: {
		padding: '0.5rem'
	},

	selects: {
		padding: '0.5rem'
	},
	toggleButton: {
		marginRight: '1rem',
		paddingRight: '1rem',
		paddingLeft: '1rem',
		marginTop: '1rem'
	},
	subtitle: {
		padding: '0.5rem'
	}
});

const FormServicesTreated = () => {
	const [ isEndocrinology, setIsEndocrinology ] = useState(false);
	const [ isGeriatry, setIsGeriatry ] = useState(false);
	const [ isEighteenPlus, setIsEighteenPlus ] = useState(false);
	const [ isCardiacCathe, setIsCardiacCathe ] = useState(false);
	const [ isGeneral, setIsGeneral ] = useState(false);
	const [ isCardiology, setIsCardiology ] = useState(false);
	const [ isDiabetes, setIsDiabetes ] = useState(false);
	const [ isOrthopedist, setIsOrthopedist ] = useState(false);
	const [ isDisabled, setIsDisabled ] = useState(true);
	const [ services, setServices ] = useState([]);
	const classes = useStyles();

	const handleSubmit = async() => {
	    let userInfo = {
			 id : '5fe8b0c48bef090026e253b7',
			 services,
			 form: 5
		 }
		try {
		 	const response = await dianurseApi.put('/profile/doctor/completeprofile', {
		 		userInfo
		 	})

		 } catch (err){
		 	console.log(err.message);
		 }
	}

	return (
		<Container fullWidth className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Services Treated</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<Grid item xs={12}>
						<Divider orientation="horizontal" />
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit()
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid container>
							<Typography className={classes.subtitle} variant="body1">
								Select Type
							</Typography>
							<Grid item xs={12} className={classes.selects}>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isEndocrinology}
									onChange={() => {setIsEndocrinology(!isEndocrinology)
									!isEndocrinology ? setServices([...services, 'Endocrinologist']) : 
									setServices(services.filter(el => { return el !== 'Endocrinologist'}))} }
								>
									Endocrinology
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isGeriatry}
									onChange={() => {setIsGeriatry(!isGeriatry)
										!isGeriatry ? setServices([...services, 'Geriatry']) : 
										setServices(services.filter(el => { return el !== 'Geriatry'}))}}
								>
									Geriatry
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isEighteenPlus}
									onChange={() => {setIsEighteenPlus(!isEighteenPlus)
										!isEighteenPlus ? setServices([...services, 'EighteenPlus']) : 
										setServices(services.filter(el => { return el !== 'EighteenPlus'}))}}
								>
									+18 years
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isCardiacCathe}
									onChange={() => {setIsCardiacCathe(!isCardiacCathe)
										!isCardiacCathe ? setServices([...services, 'Cardiac Catherization']) : 
										setServices(services.filter(el => { return el !== 'Cardiac Catherization'}))}}
								>
									Cardiac catherization
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isGeneral}
									onChange={() => {setIsGeneral(!isGeneral) 
										!isGeneral ? setServices([...services, 'General']) : 
										setServices(services.filter(el => { return el !== 'General'}))}}
								>
									General Medicine
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isCardiology}
									onChange={() => {setIsCardiology(!isCardiology)
										!isCardiology ? setServices([...services, 'Cardiology']) : 
										setServices(services.filter(el => { return el !== 'Cardiology'}))}}
								>
									Cardiology
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isDiabetes}
									onChange={() => {setIsDiabetes(!isDiabetes)
										!isDiabetes ? setServices([...services, 'Diabetes']) : 
										setServices(services.filter(el => { return el !== 'Diabetes'}))}}
								>
									Diabetes
								</ToggleButtonCustom>
								<ToggleButtonCustom
									disabled={isDisabled}
									className={classes.toggleButton}
									value="insurance"
									selected={isOrthopedist}
									onChange={() => {setIsOrthopedist(!isOrthopedist)
										!isOrthopedist ? setServices([...services, 'Orthopedist']) : 
										setServices(services.filter(el => { return el !== 'Orthopedist'}))}}
								>
									Orthopedist
								</ToggleButtonCustom>
							</Grid>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
										}}
										fullWidth
										variant="outlined"
									>
										Cancel
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
										Update
									</ButtonFilled>
								</Grid>
							</Grid>
						)}
					</form>
				</Grid>
			</PaperCustomShadow>
		</Container>
	);
};

export default FormServicesTreated;
