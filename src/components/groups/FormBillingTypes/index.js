// import React, { useState } from 'react';
// import dianurseApi from '../../../api/dianurseApi';
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

// import useStyles from './style';

// const FormBillingTypes = () => {
// 	const [ isInsurance, toggleIsInsurance ] = useState(false);
// 	const [ isPrivate, toggleIsPrivate ] = useState(false);
// 	const [ isSelfPayer, toggleIsSelfPayer ] = useState(false);
// 	const [ isBillingType, setBillingType ] = useState([]);
// 	const [ isDisabled, setIsDisabled ] = useState(true);
// 	const classes = useStyles();

// 	const handleSubmit = async () => {
// 		let userInfo = {
// 			id: '5fe8b0c48bef090026e253b7',
// 			isBillingType,
// 			form: 4
// 		};
// 		try {
// 			const response = await dianurseApi.put('/profile/doctor/completeprofile', {
// 				userInfo
// 			});
// 		} catch (err) {
// 			console.log(err.message);
// 		}
// 	};

// 	return (
// 		<Container className={classes.container}>
// 			<PaperCustomShadow className={classes.paper}>
// 				<Grid container className={classes.gridContainer}>
// 					<Grid item className={classes.title}>
// 						<Typography variant="h6">Billing Types</Typography>
// 						<IconButton onClick={() => setIsDisabled(false)}>
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
// 									className={classes.toggleButton}
// 									value="insurance"
// 									selected={isInsurance}
// 									onChange={() => {
// 										toggleIsInsurance(!isInsurance);
// 										!isInsurance
// 											? setBillingType([ ...isBillingType, 'Insurance' ])
// 											: setBillingType(
// 													isBillingType.filter((el) => {
// 														return el !== 'Insurance';
// 													})
// 												);
// 									}}
// 								>
// 									Statutory health insurance patients
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									value="insurance"
// 									selected={isPrivate}
// 									onChange={() => {
// 										toggleIsPrivate(!isPrivate);
// 										!isPrivate
// 											? setBillingType([ ...isBillingType, 'Private' ])
// 											: setBillingType(
// 													isBillingType.filter((el) => {
// 														return el !== 'Private';
// 													})
// 												);
// 									}}
// 								>
// 									Private patients
// 								</ToggleButtonCustom>
// 								<ToggleButtonCustom
// 									disabled={isDisabled}
// 									className={classes.toggleButton}
// 									value="insurance"
// 									selected={isSelfPayer}
// 									onChange={() => {
// 										toggleIsSelfPayer(!isSelfPayer);
// 										!isSelfPayer
// 											? setBillingType([ ...isBillingType, 'Payer' ])
// 											: setBillingType(
// 													isBillingType.filter((el) => {
// 														return el !== 'Payer';
// 													})
// 												);
// 									}}
// 								>
// 									Self-payers
// 								</ToggleButtonCustom>
// 							</Grid>
// 						</Grid>

// 						{isDisabled ? null : (
// 							<Grid container className={classes.buttons}>
// 								<Grid item xs={6} className={classes.button}>
// 									<ButtonOutlined
// 										onClick={() => {
// 											setIsDisabled(true);
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

// export default FormBillingTypes;
