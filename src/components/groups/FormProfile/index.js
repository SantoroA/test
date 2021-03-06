import React, { useState, useContext } from 'react';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as AuthContext } from '../../../context/AuthContext';
import useStyles from './style';
import { useTranslation } from 'react-i18next';
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
	const { state: { userId } } = useContext(AuthContext);
	// const userId = '5fe8b0c48bef090026e253b7';
	// console.log(state);
	const handleSubmit = () => {
		updateProfileInfo({ profileInfo, websiteUrl, id: userId });
	};
	const { t } = useTranslation();
	return (
		<Container className={classes.container}>
			<PaperCustomShadow className={classes.paper}>
				<Grid container className={classes.gridContainer}>
					<Grid item className={classes.title}>
						<Typography variant="h6">{t('Profile.1')}</Typography>
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
						<Grid container>
							<Grid item xs={12} className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="text"
									multiline
									rows={8}
									value={profileInfo}
									onChange={(e) => setProfileInfo(e.target.value)}
									placeholder={t('Add_information_about.1')}
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} className={classes.input}>
								<TextField
									fullWidth
									disabled={isDisabled}
									type="text"
									value={websiteUrl}
									onChange={(e) => setWebsiteUrl(e.target.value)}
									label={t('Website_Url.1')}
									variant="outlined"
								/>
							</Grid>
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
										{t('Cancel.1')}
									</ButtonOutlined>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<ButtonFilled type="submit" variant="contained" color="primary" fullWidth>
										{t('Update.1')}
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
