import React from 'react';
import Navbar from '../../components/groups/Navbar';
import Footer from '../groups/Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 50%)',
		backgroundPosition: 'cover',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},
	footer: {
		bottom: '0'
	}
});
const DocLayoutContainer = ({ children }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Navbar />
			{children}
			<div className={classes.footer}>
				<Footer />
			</div>
		</div>
	);
};

export default DocLayoutContainer;
