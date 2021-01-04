import React, { useState } from 'react';
import useStyles from './style';
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
	const [ profileInfo, setProfileInfo ] = useState('');
	const [ websiteUrl, setWebsiteUrl ] = useState('');

	const [ isDisabled, setIsDisabled ] = useState(true);
	const classes = useStyles();

	return (
		<Container fullWidth className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">Profile</Typography>
						<IconButton>
							<EditIcon onClick={() => setIsDisabled(false)} />
						</IconButton>
					</Grid>
					<form
						onSubmit={() => {
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
											setWebsiteUrl('');
											setProfileInfo('');
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
