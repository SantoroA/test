import React, { useState } from 'react';
import useStyles from './style';
import dianurseApi from '../../../api/dianurseApi';
//CUSTOM UI
import ButtonFilled from '../../customUi/ButtonFilled';
import ButtonOutlined from '../../customUi/ButtonOutlined';
import PaperCustomShadow from '../../customUi/PaperCustomShadow';
//MATERIAL UI
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

const FormEducation = () => {
	const [ education, setEducation ] = useState('');
	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	const handleSubmit = async() => {
	    let userInfo = {
			 id : '5fe8b0c48bef090026e253b7',
			 education,
			 form: 8
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
						<Typography variant="h6">Education</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
							setIsDisabled(true);
						}}
						className={classes.form}
					>
						<Grid container className={classes.input}>
							<TextField
								fullWidth
								disabled={isDisabled}
								type="number"
								value={education}
								onChange={(e) => setEducation(e.target.value)}
								placeholder="Add information about your studies"
								variant="outlined"
								multiline
								rows={6}
							/>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
											setEducation('');
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

export default FormEducation;
