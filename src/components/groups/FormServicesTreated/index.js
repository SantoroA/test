// import React, { useState, useContext } from 'react';
// import { Context as DocProfileContext } from '../../../context/DocProfileContext';
// import useStyles from './style';
// //CUSTOM UI
// import ButtonFilled from '../../customUi/ButtonFilled';
// import ToggleButtonCustom from '../../customUi/ToggleButtonCustom';
// import ButtonOutlined from '../../customUi/ButtonOutlined';
// import PaperCustomShadow from '../../customUi/PaperCustomShadow';
// //MATERIAL UI
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import EditIcon from '@material-ui/icons/Edit';

// const FormServicesTreated = () => {
// 	const { updateServices, state: { services } } = useContext(DocProfileContext);
// 	const [ isEndocrinology, setIsEndocrinology ] = useState(services.includes('Endocrinologist') ? true : false);
// 	const [ isGeriatry, setIsGeriatry ] = useState(services.includes('Geriatry') ? true : false);
// 	const [ isEighteenPlus, setIsEighteenPlus ] = useState(services.includes('EighteenPlus') ? true : false);
// 	const [ isCardiacCathe, setIsCardiacCathe ] = useState(services.includes('Cardiac Catherization') ? true : false);
// 	const [ isGeneral, setIsGeneral ] = useState(services.includes('General') ? true : false);
// 	const [ isCardiology, setIsCardiology ] = useState(services.includes('Cardiology') ? true : false);
// 	const [ isDiabetes, setIsDiabetes ] = useState(services.includes('Diabetes') ? true : false);
// 	const [ isOrthopedist, setIsOrthopedist ] = useState(services.includes('Orthopedist') ? true : false);
// 	const [ isDisabled, setIsDisabled ] = useState(true);
// 	const [ tempServices, setTempServices ] = useState([]);
// 	// const { state: {userId} } = useContext(AuthContext);
// 	const classes = useStyles();
// 	const userId = '5fe8b0c48bef090026e253b7';
// 	// console.log(services);
// 	console.log(tempServices);
// 	const resetServices = () => {
// 		return (
// 			setIsEndocrinology(services.includes('Endocrinologist') ? true : false),
// 			setIsGeriatry(services.includes('Geriatry') ? true : false),
// 			setIsEighteenPlus(services.includes('EighteenPlus') ? true : false),
// 			setIsCardiacCathe(services.includes('Cardiac Catherization') ? true : false),
// 			setIsGeneral(services.includes('General') ? true : false),
// 			setIsCardiology(services.includes('Cardiology') ? true : false),
// 			setIsDiabetes(services.includes('Diabetes') ? true : false),
// 			setIsOrthopedist(services.includes('Orthopedist') ? true : false)
// 		);
// 	};

// 	const saveServices = () => {
// 		isEndocrinology
// 			? setTempServices(!tempServices.includes('Endocrinologist') && tempServices.push('Endocrinologist'))
// 			: setTempServices(tempServices.filter((service) => service !== 'Endocrinologist'));
// 		isGeriatry
// 			? setTempServices(!tempServices.includes('Geriatry') && tempServices.push('Geriatry'))
// 			: setTempServices(tempServices.filter((service) => service !== 'Geriatry'));
// 		isEighteenPlus
// 			? setTempServices(!tempServices.includes('EighteenPlus') && tempServices.push('EighteenPlus'))
// 			: setTempServices(tempServices.filter((service) => service !== 'EighteenPlus'));
// 		isCardiacCathe
// 			? setTempServices(
// 					!tempServices.includes('Cardiac Catherization') && tempServices.push('Cardiac Catherization')
// 				)
// 			: setTempServices(tempServices.filter((service) => service !== 'Cardiac Catherization'));
// 		isGeneral
// 			? setTempServices(!tempServices.includes('General') && tempServices.push('General'))
// 			: setTempServices(tempServices.filter((service) => service !== 'General'));
// 		isCardiology
// 			? setTempServices(!tempServices.includes('Cardiology') && tempServices.push('Cardiology'))
// 			: setTempServices(tempServices.filter((service) => service !== 'Cardiology'));
// 		isDiabetes
// 			? setTempServices(!tempServices.includes('Diabetes') && tempServices.push('Diabetes'))
// 			: setTempServices(tempServices.filter((service) => service !== 'Diabetes'));
// 		isOrthopedist
// 			? setTempServices(!tempServices.includes('Orthopedist') && tempServices.push('Orthopedist'))
// 			: setTempServices(tempServices.filter((service) => service !== 'Orthopedist'));
// 	};

// 	const handleSubmit = async () => {
// 		updateServices({ services: tempServices, id: userId });
// 	};

// 	return (
// 		<Container className={classes.container}>
// 			<PaperCustomShadow className={classes.paper}>
// 				<Grid container className={classes.gridContainer}>
// 					<Grid item className={classes.title}>
// 						<Typography variant="h6">Services Treated</Typography>
// 						<IconButton
// 							onClick={() => {
// 								resetServices();
// 								setIsDisabled(false);
// 							}}
// 						>
// 							<EditIcon />
// 						</IconButton>
// 					</Grid>
// 					<Grid item xs={12}>
// 						<Divider orientation="horizontal" />
// 					</Grid>
// 					<form
// 						onSubmit={(e) => {
// 							e.preventDefault();
// 							handleSubmit();
// 							saveServices();
// 							setIsDisabled(true);
// 						}}
// 						className={classes.form}
// 					>
// 						<Grid container>
// 							<Typography className={classes.subtitle} variant="body1">
// 								Select Type
// 							</Typography>
// 							<Grid item xs={12} className={classes.selects}>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									value="Endocrinology"
// 									className={classes.toggleButton}
// 									selected={isEndocrinology}
// 									onChange={() => {
// 										setIsEndocrinology(!isEndocrinology);
// 									}}
// 								>
// 									Endocrinology
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									value="Geriatry"
// 									className={classes.toggleButton}
// 									selected={isGeriatry}
// 									onChange={() => {
// 										setIsGeriatry(!isGeriatry);
// 									}}
// 								>
// 									Geriatry
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									selected={isEighteenPlus}
// 									value="Eighteen Plus"
// 									onChange={() => {
// 										setIsEighteenPlus(!isEighteenPlus);
// 									}}
// 								>
// 									+18 years
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									selected={isCardiacCathe}
// 									value="CardioCathe"
// 									onChange={() => {
// 										setIsCardiacCathe(!isCardiacCathe);
// 									}}
// 								>
// 									Cardiac catherization
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									selected={isGeneral}
// 									value="General"
// 									onChange={() => {
// 										setIsGeneral(!isGeneral);
// 									}}
// 								>
// 									General Medicine
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									selected={isCardiology}
// 									value="Cardiology"
// 									onChange={() => {
// 										setIsCardiology(!isCardiology);
// 									}}
// 								>
// 									Cardiology
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									selected={isDiabetes}
// 									value="Diabetes"
// 									onChange={() => {
// 										setIsDiabetes(!isDiabetes);
// 									}}
// 								>
// 									Diabetes
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									selected={isOrthopedist}
// 									value="Orthopedist"
// 									onChange={() => {
// 										setIsOrthopedist(!isOrthopedist);
// 									}}
// 								>
// 									Orthopedist
// 								</ToggleButtonCustom>
// 							</Grid>
// 						</Grid>

// 						{isDisabled ? null : (
// 							<Grid container className={classes.buttons}>
// 								<Grid item xs={6} className={classes.button}>
// 									<ButtonOutlined
// 										onClick={() => {
// 											setIsDisabled(true);
// 											resetServices();
// 										}}
// 										fullWidth
// 										variant="outlined"
// 									>
// 										Cancel
// 									</ButtonOutlined>
// 								</Grid>
// 								<Grid item xs={6} className={classes.button}>
// 									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
// 										Update
// 									</ButtonFilled>
// 								</Grid>
// 							</Grid>
// 						)}
// 					</form>
// 				</Grid>
// 			</PaperCustomShadow>
// 		</Container>
// 	);
// };

// export default FormServicesTreated;
