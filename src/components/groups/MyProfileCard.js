import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as DocProfileContext } from '../../context/DocProfileContext';
//MATERIAL UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// theming
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
					<Typography variant="subtitle1" color="textSecondary">
						{specialty}
					</Typography>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card elevation={0} className={classes.root}>
				<CardMedia className={classes.cover} image={image} title="Patient Card" />

				<CardContent className={classes.content}>
					<Typography variant="h4" className={classes.docName}>
						Patient Name
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						phone and email
					</Typography>
				</CardContent>
			</Card>
		);
	}
};

export default MyProfileCard;
