import React, { useContext } from 'react';
import { Context as LanguageContext } from '../../context/LanguageContext';
import { Context as AuthContext } from '../../context/AuthContext';

//MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
	return (
		<Grid container>
			<Grid xs={12}>
				<Typography variant="body1">Footer</Typography>
			</Grid>
			<Grid item md={3}>
				<Typography variant="body1">Column 1</Typography>
			</Grid>
			<Grid item md={3}>
				<Typography variant="body1">Column 2</Typography>
			</Grid>
			<Grid item md={3}>
				<Typography variant="body1">Column 3</Typography>
			</Grid>
			<Grid item md={3}>
				<Typography variant="body1">Column 4</Typography>
			</Grid>
		</Grid>
	);
};
export default Footer;
