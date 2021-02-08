import React, { useContext } from 'react';
import { Context as AuthContext } from '../../../context/AuthContext';
import { Context as DocProfileContext } from '../../../context/DocProfileContext';
import { Context as PatProfileContext } from '../../../context/PatProfileContext';
//MATERIAL UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

import useStyles from './style';

const CardMyProfile = () => {
	const classes = useStyles();
	const { state: { userAmIHCP } } = useContext(AuthContext);
	const { state: { firstName, lastName, image, specialty, phoneNumber, email } } = useContext(
		userAmIHCP ? DocProfileContext : PatProfileContext
	);
	console.log(specialty);
	return (
		<Card elevation={0} className={classes.root}>
			<CardMedia className={classes.cover} image={image} title={lastName} />
			<CardContent className={classes.content}>
				{userAmIHCP ? (
					<div>
						<Typography variant="h4" className={classes.docName}>
							Dr. {firstName} {lastName}
						</Typography>
						<Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
							{specialty}
						</Typography>
					</div>
				) : (
					<div>
						<Typography variant="h4" className={classes.docName}>
							{firstName} {lastName}
						</Typography>
						<Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
							<PhoneIcon className={classes.icon} color="primary" /> {phoneNumber}
						</Typography>
						<Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
							<MailIcon className={classes.icon} color="primary" /> {email}
						</Typography>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default CardMyProfile;
