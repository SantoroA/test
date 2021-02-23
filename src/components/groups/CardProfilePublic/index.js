import React from 'react';
//MATERIAL UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		height: '12rem',
		boxShadow: '0px 6px 12px 0px rgba(16, 30, 115, 0.06)'
	},

	content: {
		display: 'flex',
		flexDirection: 'column'
	},
	cover: {
		width: '12rem'
	},
	docName: {
		fontWeight: '700'
	},
	subtitle: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '1rem'
	},
	icon: {
		marginRight: '0.5rem'
	}
});

const CardProfilePublic = ({ firstName, lastName, phoneNumber, email, isHCP, image, specialty }) => {
	const classes = useStyles();

	return (
		<Card elevation={0} className={classes.root}>
			<CardMedia className={classes.cover} image={image} title={lastName} />
			<CardContent className={classes.content}>
				{isHCP ? (
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

export default CardProfilePublic;
