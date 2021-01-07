import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
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
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto'
	},
	cover: {
		width: '12rem'
	}
});

const DocProfileCard = () => {
	const classes = useStyles();

	const { state: { userName } } = useContext(AuthContext);

	return (
		<Card elevation={0} className={classes.root}>
			<CardMedia
				className={classes.cover}
				image="https://images.pexels.com/photos/3846038/pexels-photo-3846038.jpeg?cs=srgb&dl=pexels-anna-shvets-3846038.jpg&fm=jpg"
				title="Live from space album cover"
			/>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						{userName} - (Doc Name)
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Insert Specialty
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
};

export default DocProfileCard;
