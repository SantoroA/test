import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
//MATERIAL UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

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

const MyProfileCard = () => {
	const classes = useStyles();
	const { state: { firstName, lastName, image, specialty } } = useContext(DocProfileContext);
	const { state: { userAmIHCP } } = useContext(AuthContext);
	if (userAmIHCP) {
		return (
			<Card elevation={0} className={classes.root}>
				<CardMedia className={classes.cover} image={image} title={`Dr. ${lastName}`} />

				<CardContent className={classes.content}>
					<Typography variant="h4" className={classes.docName}>
						Dr. {firstName} {lastName}
					</Typography>
					<Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
						{specialty}
					</Typography>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card elevation={0} className={classes.root}>
				<CardMedia
					className={classes.cover}
					image="https://images.pexels.com/photos/4226462/pexels-photo-4226462.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					title="Patient Card"
				/>

				<CardContent className={classes.content}>
					<Typography variant="h4" className={classes.docName}>
						Patient Name
					</Typography>
					<Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
						<PhoneIcon className={classes.icon} color="primary" /> phone
					</Typography>
					<Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
						<MailIcon className={classes.icon} color="primary" /> email
					</Typography>
				</CardContent>
			</Card>
		);
	}
};

export default MyProfileCard;
