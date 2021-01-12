import React, { useState, useContext } from 'react';
import useStyles from './style';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
// import { Context as AuthContext } from '../../context/AuthContext';
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

const FormProfile = () => {
	const { updateProfileInfo, state } = useContext(DocProfileContext);
	const [ profileInfo, setProfileInfo ] = useState(state.profileInfo);
	const [ websiteUrl, setWebsiteUrl ] = useState(state.websiteUrl);

	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();
	// const { state: {userId} } = useContext(AuthContext);
	const userId = '5fe8b0c48bef090026e253b7';
	console.log(state);
	const handleSubmit = () => {
		updateProfileInfo({ profileInfo, websiteUrl });
	};

	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Profile</Typography>
						<IconButton onClick={() => setIsDisabled(false)}>
							<EditIcon />
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
						<Grid className={classes.input}>
							<TextField
								fullWidth
								disabled={isDisabled}
								type="text"
								multiline
								rows={8}
								value={profileInfo}
								onChange={(e) => setProfileInfo(e.target.value)}
								placeholder="Add information about your clinical practice"
								variant="outlined"
							/>
						</Grid>
						<Grid className={classes.input}>
							<TextField
								fullWidth
								disabled={isDisabled}
								type="text"
								value={websiteUrl}
								onChange={(e) => setWebsiteUrl(e.target.value)}
								label="Website Url"
								variant="outlined"
							/>
						</Grid>

						{isDisabled ? null : (
							<Grid container className={classes.buttons}>
								<Grid item xs={6} className={classes.button}>
									<ButtonOutlined
										onClick={() => {
											setIsDisabled(true);
											setWebsiteUrl(state.websiteUrl);
											setProfileInfo(state.profileInfo);
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

export default FormProfile;
